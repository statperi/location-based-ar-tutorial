window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Voicesage',
            location: {
                lat: 53.300399,
                lng: -6.176398,
            },
        },
        {
            name: 'Home',
            location: {
                lat: 53.299684,
                lng: -6.177198,
            },
        },
        {
            name: 'Bear',
            location: {
                lat: 53.301403,
                lng: -6.177578,
            },
        },
        {
            name: 'Bear Stillorgan',
            location: {
                lat: 53.2889278,
                lng: -6.2071782,
            },
        },
        {
            name: 'Spire',
            location: {
                lat: 53.349810,
                lng: -6.260130,
            },
        },
        {
            name: 'Poolbeg Powerstation',
            location: {
                lat: 53.3402763,
                lng: -6.189487,
            },
        }
    ];
}

var models = [
    {
        code : 'articuno',
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
    },
    {
        code: 'bear',
        url: './assets/bear/scene.gltf',
        scale: '0.1 0.1 0.1',
        rotation: '0 180 0',
        info: 'Bear'
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    var element = $(entity);

    if (model.scale) {
        // entity.setAttribute('scale', model.scale);
        element.attr('scale', model.scale);
    }

    if (model.rotation) {
        //entity.setAttribute('rotation', model.rotation);
        element.attr('rotation', model.rotation);
    }

    if (model.position) {
        // entity.setAttribute('position', model.position);
        element.attr('position', model.position);
    }

    //entity.setAttribute('gltf-model', model.url);
    //entity.setAttribute('animation-mixer', '');

    element.attr('gltf-model', model.url);
    element.attr('animation-mixer', '');

    const name = document.querySelector('.name');
    modelName = name.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        if (place.name == 'Voicesage') {
            calculateVoicesageDistance(model);
        }

        scene.appendChild(model);
    });


    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        var entities = document.querySelectorAll('a-entity[gps-entity-place]');

        modelIndex++;
        var newIndex = modelIndex % models.length;

        for (var i = 0; i < entities.length -1; i++) {
            setModel(models[newIndex], entities[i]);
        }
    });


    document.querySelector('button[data-action="search"]').addEventListener('click', function () {
        clearModels();

        let bird = models[1];
        let text = $('.searchtext')[0].value;
        let place = getPlace(text);

        createModel(bird, place);
    });
}

function calculateVoicesageDistance(entity) {
    setInterval(function () {
        distance = entity.getAttribute('distance');

        if (distance) {
            const name = document.querySelector('.name');
            // name.innerText = modelName + ' ' + Math.trunc(distance) + ' meters';
            name.innerText = modelName + ' ' + distance + ' meters';
        }
    }, 3000);
}

function calculateDistance(entity) {
    setInterval(function () {
        distance = entity.getAttribute('distance');
        
    }, 3000);
}



function createModel(model, place) {
    let scene = document.querySelector('a-scene');
    let entity = document.createElement('a-entity');
    entity.setAttribute('gps-entity-place', `latitude: ${place.location.lat}; longitude: ${place.location.lng};`);

    setModel(model, entity);

    scene.appendChild(entity);
}

function getPlace(text) {
    let place;
    if (text.toUpperCase() === "Grattan House".toUpperCase()) {
        place = {
            name: 'Voicesage',
            location: { lat: 53.300399, lng: -6.176398 }
        }
    } else if (text.toUpperCase() === "Bear".toUpperCase()) {
        place = {
            name: 'Bear',
            location: { lat: 53.301403, lng: -6.177578 }
        }
    } else {
        place = {
            name: 'Home',
            location: { lat: 53.299684, lng: -6.177198 }
        }
    }
    return place;

    //getCoordinates(text);
}

function clearModels() {
    var entities = $('a-entity[gps-entity-place]');
    entities.remove();
}

//function getCoordinates(text) {
//     search google map api
//    let map = new google.maps.Map(document.getElementById("map"), {});
//    let service = new google.maps.places.PlacesService(map);

//    const request = {
//        query: text,
//        fields: ["name", "geometry"],
//    };

//    service.findPlaceFromQuery(request, (results, status) => {
//        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//            console.log(results);
//        }
//    });
//}
