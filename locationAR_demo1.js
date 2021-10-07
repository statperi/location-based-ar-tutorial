var position;
var ar_model;

window.onload = () => {

    ar_model = ar_models[0];

    getCurrentLocation();

    $('.model-selector').select2();
    $('.model-selector').on('select2:select', function (e) {
        var data = e.params.data;
        ar_model = ar_models.find(function (m) { return m.code == data.id });

        clearModels();
        createModel(ar_model, position);
    });
};


var setModel = function (model, entity) {
    var element = $(entity);

    if (model.scale) {
        element.attr('scale', model.scale);
    }

    if (model.rotation) {
        element.attr('rotation', model.rotation);
    }

    if (model.position) {
        element.attr('position', model.position);
    }

    element.attr('gltf-model', model.url);
    element.attr('animation-mixer', '');

    const name = document.querySelector('.name');
    modelName = name.innerText = model.info;
};


function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}


function getCoordinates(location) {
    position = {
        name: "Current Position",
        location: {
            lat: location.coords.latitude,
            lng: location.coords.longitude
        }
    };

    createModel(ar_model, position);
}


function createModel(model, place) {
    let scene = document.querySelector('a-scene');
    let entity = document.createElement('a-entity');
    entity.setAttribute('gps-entity-place', `latitude: ${place.location.lat}; longitude: ${place.location.lng};`);

    setModel(model, entity);

    scene.appendChild(entity);
}


function clearModels() {
    var entities = $('a-entity[gps-entity-place]');
    entities.remove();
}


var ar_models = [
    {
        code: 'articuno',
        url: './assets/articuno/scene.gltf',
        scale: '0.1 0.1 0.1',
        rotation: '0 180 0',
        info: 'Articuno'
    },
    {
        code: 'bird',
        url: './assets/phoenix_bird/scene.gltf',
        scale: '0.1 0.1 0.1',
        rotation: '0 180 0',
        info: 'Bird'
    }
];


//function staticLoadPlaces() {
//    return [
//        {
//            name: 'Voicesage',
//            location: {
//                lat: 53.300399,
//                lng: -6.176398,
//            },
//        },
//        {
//            name: 'Home',
//            location: {
//                lat: 53.299684,
//                lng: -6.177198,
//            },
//        },
//        {
//            name: 'Bear',
//            location: {
//                lat: 53.301403,
//                lng: -6.177578,
//            },
//        },
//        {
//            name: 'Bear Stillorgan',
//            location: {
//                lat: 53.2889278,
//                lng: -6.2071782,
//            },
//        },
//        {
//            name: 'Spire',
//            location: {
//                lat: 53.349810,
//                lng: -6.260130,
//            },
//        },
//        {
//            name: 'Poolbeg Powerstation',
//            location: {
//                lat: 53.3402763,
//                lng: -6.189487,
//            },
//        }
//    ];
//}





//var models = [
//    {
//        code: 'articuno',
//        url: './assets/articuno/scene.gltf',
//        scale: '0.1 0.1 0.1',
//        rotation: '0 180 0',
//        info: 'Articuno'
//    },
//    {
//        code: 'bird',
//        url: './assets/phoenix_bird/scene.gltf',
//        scale: '0.1 0.1 0.1',
//        rotation: '0 180 0',
//        info: 'Bird'
//    },
//    {
//        code: 'bear',
//        url: './assets/bear/scene.gltf',
//        scale: '0.1 0.1 0.1',
//        rotation: '0 180 0',
//        info: 'Bear'
//    },
//];


//function getPlace(text) {
//    let place;
//    if (text.toUpperCase() === "Grattan House".toUpperCase()) {
//        place = {
//            name: 'Voicesage',
//            location: { lat: 53.300399, lng: -6.176398 }
//        }
//    } else if (text.toUpperCase() === "Bear".toUpperCase()) {
//        place = {
//            name: 'Bear',
//            location: { lat: 53.301403, lng: -6.177578 }
//        }
//    } else {
//        place = {
//            name: 'Home',
//            location: { lat: 53.299684, lng: -6.177198 }
//        }
//    }
//    return place;
//}

