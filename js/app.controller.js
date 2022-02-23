import { locService } from "./services/loc.service.js"
import { mapService } from "./services/map.service.js"

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

// todo add API to google maps
// Enable the user to pick a location by clicking on map

// Build the LocationService managing Locations:
// {id, name, lat, lng, weather, createdAt, updatedAt}
// 5. Locations are saved to localStorage

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log("Map is ready")
    })
    .catch(() => console.log("Error: cannot init map"))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log("Getting Pos")
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log("Adding a marker")
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log("Locations:", locs)
    var html = '<tr>'
    var htmls = locs.map(loc =>{
        return `
        <td>${loc.id}</td>
        <td>${loc.name}</td>
        <td>${loc.lat}</td>
        <td>${loc.lng}</td>
        <td>${loc.createdAt}</td>
        <td>${loc.updatedAt}</td>
        <td><button onclick="onGo(${loc.lat}, ${loc.lng})"></button></td>
        <td><button onclick="onDelete(${loc.id})"></button></td>
        `
    })
    html += htmls.join('')
    html += '</tr>'
    document.querySelector(".locs").innerHTML = html
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log("User position is:", pos.coords)
      document.querySelector(
        ".user-pos"
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log("err!!!", err)
    })
}
function onPanTo() {
  console.log("Panning the Map")
  mapService.panTo(35.6895, 139.6917)
}
