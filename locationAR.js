window.onload = () => {
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


function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(processGetCoordinates);
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}


//function getCoordinates(location) {
//    processGetCoordinates({
//        latitude: location.coords.latitude,
//        longitude: location.coords.longitude
//    });
//}


function processGetCoordinates(currentLocation) {

    var data = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
    };

    $.ajax({
        url: 'https://4ov2cmmwri.execute-api.eu-west-1.amazonaws.com/Prod/api/coordinates',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        crossDomain: true,
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (response) {
            console.log(response);

            if (response.status == 200) {
                getCoordinatesSuccess(response);
            }
        },
        error: function (err) {
            console.log(err);
            alert("Could not get target locations");
        }
    });
}


var modelIndex = 0;
function getCoordinatesSuccess(response) {
    for (var i = 0; i < response.data.length; i++) {
        modelIndex++;

        let position = response.data[i];
        let newIndex = modelIndex % ar_models.length;
        let ar_model = ar_models[newIndex];

        createModel(ar_model, position);
    }
}


function createModel(model, place) {
    let scene = document.querySelector('a-scene');
    let entity = document.createElement('a-entity');
    entity.setAttribute('gps-entity-place', `latitude: ${place.location.latitude}; longitude: ${place.location.longitude};`);

    setModel(model, entity);

    scene.appendChild(entity);
}


function setModel(model, entity) {
    let element = $(entity);

    if (model.scale) element.attr('scale', model.scale);
    if (model.rotation) element.attr('rotation', model.rotation);
    if (model.position) element.attr('position', model.position);

    element.attr('gltf-model', model.url);
    element.attr('animation-mixer', '');
};
