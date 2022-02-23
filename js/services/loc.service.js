'use strict'

import { storage } from './services/storage.services.js'

export const locService = {
    getLocs,
    setLoc
}

var gNextId = '101'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function setLoc(pos){

    const loc = {
        id: `L${gNextId++}`,
        name: 'can',
        lat: 34,
        lng: 45,
        weather: getWeather(),
        createdAt: new Date(),
        updatedAt: null,
    }
    locs.unshift(loc)
    //save to storage
    console.log(loc);
}

function getWeather(lat, lng) {
    return 'Wonderful'
}