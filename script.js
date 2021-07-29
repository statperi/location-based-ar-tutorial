﻿window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);

    var distanse = 0;

    //window.addEventListener('gps-camera-update-position', e => {

    //    console.log(e);

    //    //if (this.loaded === false) {
    //    //    this._loadPeaks(e.detail.position.longitude, e.detail.position.latitude);
    //    //    this.loaded = true;
    //    //}
    //});

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
        //{
        //    name: 'Peri',
        //    location: {
        //        lat: 53.300438,
        //        lng: -6.176597,
        //    },
        //},
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
            name: 'Spire',
            location: {
                lat: 53.349810,
                lng: -6.260130,
            },
        },
    ];
}

var models = [
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.1 0.1 0.1',
        rotation: '0 180 0',
        info: 'Articuno',
        // position: '0 10 0'
    },
    //{
    //    url: './assets/magnemite/scene.gltf',
    //    scale: '0.5 0.5 0.5',
    //    rotation: '0 180 0',
    //    info: 'Magnemite',
    //    // position: '0 10 0'
    //},
    //{
    //    url: './assets/dragonite/scene.gltf',
    //    scale: '0.05 0.05 0.05',
    //    rotation: '0 180 0',
    //    info: 'Dragonite',
    //    //position: '0 10 0'
    //},
    {
        url: './assets/phoenix_bird/scene.gltf',
        scale: '0.1 0.1 0.1',
        rotation: '0 180 0',
        info: 'Bird',
        //position: '0 10 0'
    },
    {
        url: './assets/bear/scene.gltf',
        scale: '0.1 0.1 0.1',
        rotation: '0 180 0',
        info: 'Bear',
        //position: '0 10 0'
    },
    //{
    //    url: './assets/hargor/scene.gltf',
    //    scale: '0.1 0.1 0.1',
    //    rotation: '0 180 0',
    //    info: 'Bear',
    //    //position: '0 10 0'
    //},
    //{
    //    url: './assets/cesiumMan/cesiumMan.gltf',
    //    scale: '0.2 0.2 0.2',
    //    rotation: '0 180 0',
    //    info: 'Cesium Man',
    //    // position: '0 10 0'
    //},
    //{
    //    url: './assets/elephant.glb',
    //    scale: '0.2 0.2 0.2',
    //    rotation: '0 180 0',
    //    info: 'Elephant',
    //},
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const name = document.querySelector('.name');
    name.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        if (place.name == 'Voicesage') {
            setInterval(calculateDistance(model), 3000);
        }

        scene.appendChild(model);
    });


    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        //var entity = document.querySelector('[gps-entity-place]');
        //var entity = document.querySelectorAll('[gps-entity-place]')[0];
        var entities = document.querySelectorAll('[gps-entity-place]');

        modelIndex++;
        var newIndex = modelIndex % models.length;
        //setModel(models[newIndex], entity);

        for (var i = 0; i < entities.length -1; i++) {
            setModel(models[newIndex], entities[i]);
        }
    });


    function calculateDistance(entity) {
        let distance = entity.getAttribute('distance');

        if (distance) {
            const name = document.querySelector('.name');
            name.innerText += ' ' + distance + ' meters';
        }
        
    }

}

