var position;
var ar_model;

window.onload = () => {
    ar_model = ar_models[0];

    getCurrentLocation();
};


var ar_models = [{
    code: 'articuno',
    url: './assets/articuno/scene.gltf',
    scale: '0.1 0.1 0.1',
    rotation: '0 180 0',
    info: 'Articuno'
}, {
    code: 'bird',
    url: './assets/phoenix_bird/scene.gltf',
    scale: '0.1 0.1 0.1',
    rotation: '0 180 0',
    info: 'Bird'
}
];


var setModel = function (model, entity) {
    var element = $(entity);

    if (model.scale) element.attr('scale', model.scale);
    if (model.rotation) element.attr('rotation', model.rotation);
    if (model.position) element.attr('position', model.position);
    
    element.attr('gltf-model', model.url);
    element.attr('animation-mixer', '');
};


function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}

function setPosition(location) {
    position = {
        name: "Current Position",
        location: {
            lat: location.coords.latitude,
            lng: location.coords.longitude
        }
    };

    getLocations(new { latitude: location.coords.latitude, longitude: location.coords.longitude });
    // createModel(ar_model, position);
}


function createModel(model, place) {
    let scene = document.querySelector('a-scene');
    let entity = document.createElement('a-entity');
    entity.setAttribute('gps-entity-place', `latitude: ${place.location.lat}; longitude: ${place.location.lng};`);

    setModel(model, entity);

    scene.appendChild(entity);
}




function getLocations(currentLocation) {

    $.ajax({
        url: 'https://4ov2cmmwri.execute-api.eu-west-1.amazonaws.com/Prod/api/coordinates',
        //headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        //crossDomain: true,
        type: 'POST',
        dataType: 'json',
        data: currentLocation,
        success: function (data) {
            console.log(data);
            getLocationSuccess(data);
        },
        error: function (err) {
            console.log(err);
            alert("Could not get target locations");
        }
    });
}


function getLocationSuccess(response) {
    if (response.status == 200) {
        console.log(response);
    }
}
