import {Dimensions} from "react-native";

var {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

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
        return {payload: result};
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