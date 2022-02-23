
// import { axios } from '../../lib/axios.js';
import { locService } from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    goToLocation,
    getSearchedCoords
}
const API_KEY = 'AIzaSyAH7HndJAEGIlo1EdEl3LMTzkyC6XQKKPU'
var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })

            gMap.addListener('click', ({ latLng }) => {
                const name = prompt('Give name')
                const pos = {
                    name,
                    coords: {
                        lat: latLng.lat(),
                        lng: latLng.lng()
                    }
                }
                locService.setLoc(pos)
                // onAddPlace(pos)
                // renderPlaces()
                // console.log(pos);
                gMap.setCenter(pos.coords);
            })
            // console.log('Map!', gMap);
        })
}

function getSearchedCoords(searchTerms){
    return axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerms}&key=${API_KEY}`
    )
    .then((res) => res.data)
    .catch((err) => {
        throw err
    })
    }

function goToLocation(lat, lng){
    gMap.setCenter({lat: lat, lng: lng})
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}