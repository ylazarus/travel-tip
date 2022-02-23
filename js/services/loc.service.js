

import { storage } from './storage.service.js'

export const locService = {
    getLocs,
    setLoc,
    deleteLoc,
    getLink,
    getWeather,
}


const STORAGE_KEY = 'locsDB'
var gLocs = storage.loadFromStorage(STORAGE_KEY) || []

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}
function setLoc(pos){
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

function getLink(place){

    const loc = {lat: 34, lng: 35}
    return `http://127.0.0.1:5500/index.html?lat=${loc.lat}&lng=${loc.lng}`
    // return `https://ylazarus.github.io/travel-tip/index.html?lat=${loc.lat}&lng=${loc.lng}`
}

function getWeather(lat, lng) {
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${W_KEY}`
    return 'Wonderful'
}