

import { storage } from './storage.service.js'

export const locService = {
    getLocs,
    setLoc,
}


const STORAGE_KEY = 'locsDB'
var gLocs;

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}
function setLoc(pos){
    gLocs = loadFromStorage(STORAGE_KEY) || []
    const loc = {
        id: Math.floor(Math.random()*1000),
        name: pos.name,
        lat: pos.coords.lat,
        lng: pos.coords.lng,
        // weather: getWeather(),
        createdAt: new Date(),
        updatedAt: null,
    }
    gLocs.unshift(loc)
    storage.saveToStorage(STORAGE_KEY, gLocs)
    console.log(loc);
}

function deleteLoc(locId){
    gLocs.splice(gLocs.findIndex(loc => loc.id===locId), 1)
    storage.saveToStorage(STORAGE_KEY, gLocs)
}

// function getWeather(lat, lng) {
//     return 'Wonderful'
// }