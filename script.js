window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
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
        //{
        //    name: 'Home',
        //    location: {
        //        lat: 53.299684,
        //        lng: -6.177198,
        //    },
        //},
        //{
        //    name: 'Bear',
        //    location: {
        //        lat: 53.299684,
        //        lng: -6.177198,
        //    },
        //},
    ];
}

var models = [
    //{
    //    url: './assets/magnemite/scene.gltf',
    //    scale: '0.5 0.5 0.5',
    //    rotation: '0 180 0',
    //    info: 'Magnemite',
    //    position: '0 10 0'
    //},
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.1 0.1 0.1',
        rotation: '0 180 0',
        info: 'Articuno',
        // position: '0 10 0'
    },
    //{
    //    url: './assets/dragonite/scene.gltf',
    //    scale: '0.2 0.2 0.2',
    //    rotation: '0 180 0',
    //    info: 'Dragonite',
    //    position: '0 10 0'
    //},
    //{
    //    url: './assets/cesiumMan/cesiumMan.gltf',
    //    scale: '0.2 0.2 0.2',
    //    rotation: '0 180 0',
    //    info: 'Cesium Man',
    //    position: '0 10 0'
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

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            //var entity = document.querySelector('[gps-entity-place]');
            var entity = document.querySelectorAll('[gps-entity-place]')[0];
            modelIndex++;
            if (models.length <= modelIndex) {
                modelIndex = 0;
            }
            // var newIndex = modelIndex % models.length;
            setModel(models[modelIndex], entity);
        });

        scene.appendChild(model);
    });
}

