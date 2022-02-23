import { locService } from "./services/loc.service.js"
import { mapService } from "./services/map.service.js"

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDelete = onDelete
window.onGo = onGo
window.onGoToLocation = onGoToLocation

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

function onGo(lat, lng) {
    console.log(lat);
    console.log(lng);
  mapService.goToLocation(lat, lng)
}

function onAddMarker() {
  console.log("Adding a marker")
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log("Locations:", locs)
    var html = `<thead>
    <tr>
      <th>Name</th>
      <th>ID</th>
      <th>Lat</th>
      <th>Lng</th>
      <th>Created at:</th>
      <th>Updated at:</th>
      <th colspan="2">Options:</th>
    </tr>
  </thead>
  <tbody>`
    var htmls = locs.map((loc) => {
      return `
        <tr>
        <td>${loc.name}</td>
        <td>${loc.id}</td>
        <td>${loc.lat}</td>
        <td>${loc.lng}</td>
        <td>${loc.createdAt}</td>
        <td>${loc.updatedAt}</td>
        <td><button onclick="onGo(${loc.lat}, ${loc.lng})">Go Here</button></td>
        <td><button onclick="onDelete(${loc.id})">Delete</button></td>
        '</tr>
        `
    })
    html += htmls.join("")
    html += "</tbody>"
    document.querySelector(".locs").innerHTML = html
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log("User position is:", pos.coords)
      onGo(pos.coords.latitude, pos.coords.longitude)
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

function onDelete(locId) {
  locService.deleteLoc(locId)
  onGetLocs()
}

function onGoToLocation() {
  var elSearchWord = document.querySelector("input[name=search]")
  var userSearchWord = elSearchWord.value
  mapService.getSearchedCoords(userSearchWord).then((pos) => {
      console.log(pos);
    onGo(pos.results[0].geometry.location.lat, pos.results[0].geometry.location.lng)//check accuracy of object
  })
}
