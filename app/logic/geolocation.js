import {Dimensions} from 'react-native';
import {loadMyPets} from './pet';
import {postMarkings} from '../common/api/markings';

let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export function getCurrentRegion() {
    return getCurrentRegionPromise().then((result) => {
        return {payload: result};
    }).catch((error) => {
        return {error: error};
    });
}

function getCurrentRegionPromise() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            },
            (error) => reject(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    });
}

export function getWatchId() {
    return getWatchIdPromise().then((result) => {
        return {payload: {watchId: result}};
    }).catch((error) => {
        return {error: error};
    });
}

function getWatchIdPromise() {
    return new Promise((resolve, reject) => {
        resolve(navigator.geolocation.watchPosition(
            (position) => {},
            (error) => reject(error)
        ));
    });
}

export function clearWatchId(watchId) {
    return clearWatchIdPromise(watchId).then(() => {
        return {payload: {watchId: null}};
    });
}

function clearWatchIdPromise(watchId) {
    return Promise.resolve(navigator.geolocation.clearWatch(watchId));
}

export function startMarking(markings, petId,  eventType) {

    return loadMyPets(false)
        .then((result) => {
            const petIds = [];
            result.payload.forEach((pet) => {
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
