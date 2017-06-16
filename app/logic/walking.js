
export function convert(state) {
  // redux stateから必要な値を取り出す
  const {pets, markings, startDateTime, endDateTime, distance} = state;

  // 複数ペットを散歩に連れ出しているので、それぞれマーキングイベントを作成
  var list = new Array();
  pets.forEach((p) => {
    // [{petId, dateTime, eventType, geometry}]の形に変換
    var events = new Array();
    markings.forEach(m => {
      if (m.pet.id === p.id) {
        events.push({petId:p.id, dateTime:m.time.toDate(), eventType:m.type, geometry:m.geometry});
      }
    });

    // [{petId, startDateTime, endDateTime, distance, memo, events}]の形に変換
    list.push({petId:p.id, startDateTime:startDateTime.toDate(), endDateTime:endDateTime.toDate(), distance, memo:null, events});
  });

  return list;
}

export function startMarking(markings, petId,  eventType) {
  return loadMyPets(false)
    .then((result) => {
      const petIds = [];
      result.payload.filter((pet) => {
        return (pet.dead === undefined || pet.dead == '0');
      })
        .forEach((pet) => {
          petIds.push(pet.id);
        });
      return petIds;
    })
    .then((result) => {
      return getCurrentRegionPromise()
        .then((result2) => {
          const now = new Date().toISOString();

          // ペットごとにイベントを作成する
          if (petId) {
            const event = {
              petId: petId,
              eventType: eventType,
              eventDateTime: now,
              geometry: {
                type: 'Point',
                coordinates: [result2.region.longitude, result2.region.latitude]
              }
            };

            markings.events.push(event);
          } else {
            // ペットの指定が無ければ全てのペットのイベントとして記録する
            result.forEach((id) => {
              const event = {
                petId: id,
                eventType: eventType,
                eventDateTime: now,
                geometry: {
                  type: 'Point',
                  coordinates: [result2.region.longitude, result2.region.latitude]
                }
              };

              markings.events.push(event);
            });
          }

          return {payload: markings};
        }).catch((error) => {
          return {error: error};
        });
    })
    .then((result) => {
      if (eventType === 'END') {
        return postMarkings(result.payload); // エラー処理は共通処理内で実施済みなので呼ぶだけで良い
      } else {
        return result;
      }
    });
}
