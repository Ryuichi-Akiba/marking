import {AccessToken} from 'react-native-fbsdk';

export function getFacebookAccessToken() {
  return AccessToken.getCurrentAccessToken()
    .then(payload => {
      return {payload};
    })
    .catch(error => {
      return {error};
    });
};

//
// // @Deprecated
// export function me() {
//   const infoRequest = new GraphRequest(
//     '/me?fields=id,name,first_name,last_name,email,gender,picture.width(350).height(350)',
//     null,
//     (error, result) => {
//       if (error) {
//         console.log('Error fetching data: ' + error.toString());
//       } else {
//         console.log('Success fetching data: ' + JSON.stringify(result));
//       }
//     },
//   );
//
//   // Start the graph request.
//   new GraphRequestManager().addRequest(infoRequest).start();
// }
