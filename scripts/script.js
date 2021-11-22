window.onload = () => {
    let bear = Bear();
    bear.location = bear.text.location = { latitude: 53.3014227, longitude: -6.1777447 };
    createEntity(bear);

    let bear2 = Bear();
    bear2.location = bear2.text.location = { latitude: 53.2895683, longitude: -6.2065826 };
    createEntity(bear2);
};

var Bear = () => {
    return {
        code: 'bear',
        url: './assets/bear_male/scene.gltf',
        scale: '0.05 0.05 0.05',
        rotation: '0 0 0',
        // position: '0 30 0',
        // lookAt: '[camera]',
        gestureConfig: 'minScale: 0.01; maxScale: 5',
        info: 'Bear Market',
        text: {
            scale: '100 100 100',
            lookAt: '[camera]',
            gestureConfig: 'minScale: 0.01; maxScale: 5',
            text: 'Bear Market'
        },
        ground: false,
        animation: 'clip: Arm_Bear|Idle_2; loop: repeat;',
        successAnimation: ''
    }
}

function createEntity(model, autoscale) {
    let scene = document.querySelector('a-scene');

    let entityEl = createEntityElement(model);
    scene.appendChild(entityEl);

    if (model.ground) {
        let planeEl = createPlaneElement();
        scene.appendChild(planeEl);
    }

    if (model.text) {
        let textEl = createTextElement(model.text);
        entityEl.appendChild(textEl);
        refresh(entityEl, textEl, autoscale);
    }
}

function refresh(entity, text, autoscale) {
    var intervalId =
        setInterval(function () {
            distance = entity.getAttribute('distance');

            if (!distance)
                return;

            text.setAttribute('value', entity.getAttribute('info') + ' - ' + Math.trunc(distance) + ' meters');

            if (autoscale) {
                let scale = calculateScale(distance);
                setScale(entity, scale);
                setScale(text, scale * 10);
            }

            if (Math.trunc(distance) <= 30) {
                clearInterval(entity.getAttribute('intervalId'));
                showSuccess(entity, text);
            }

        }, 1000);

    entity.setAttribute('intervalId', intervalId);
}

function showSuccess(entity, text) {
    text.remove();
    animate(entity, 'clip: Arm_Bear|Lie; loop: once; duration:2; clampWhenFinished: true;')

    let exit = false;
    let entered = false;
    setTimeout(() => {
        if (exit) {
            entity.removeAttribute('animation-mixer');
            return;
        }

        if (entered) {
            animate(entity, 'clip: Arm_Bear|Sleep; loop: once; clampWhenFinished: true;')
            exit = true;
        }

        entered = true;
    }, 2000);
}


function setScale(model, scale) {
    model.setAttribute('scale', scale + ' ' + scale + ' ' + scale + ' ');
}

function calculateScale(distance) {
    let scale = 0.25;

    if (distance > 100) scale = 1;
    if (distance > 200) scale = 2;
    if (distance > 500) scale = 4;
    if (distance > 1000) scale = 10;
    if (distance > 3000) scale = 30;
    if (distance > 5000) scale = 50;

    return scale;
}

function animate(element, animation) {
    element.setAttribute('animation-mixer', animation);
}

function createEntityElement(config) {
    let element = document.createElement('a-entity');
    element.setAttribute('scale', config.scale);
    //element.setAttribute('rotation', config.rotation);
    element.setAttribute('position', config.position);
    element.setAttribute('gltf-model', config.url);
    element.setAttribute('info', config.info);
    element.setAttribute('animation-mixer', config.animation ? config.animation : '');
    element.setAttribute('success', 'false');
    element.setAttribute('gps-entity-place', `latitude: ${config.location.latitude}; longitude: ${config.location.longitude};`);

    if (config.lookAt == '[camera]') {
        element.setAttribute('look-at', '[camera]');
    }
    else if (config.gestureConfig) {
        element.setAttribute('gesture-handler', config.gestureConfig);
        element.classList.add('clickable');
    }

    return element;
}

function createPlaneElement() {
    let element = document.createElement('a-plane');
    element.setAttribute('position', '0 0 0');
    element.setAttribute('rotation', '-90 0 0');
    element.setAttribute('width', '50');
    element.setAttribute('height', '50');
    element.setAttribute('material', 'shader: shadow');
    element.setAttribute('shadow', '');
    return element;
}

function createTextElement(config) {
    let element = document.createElement('a-text');
    element.setAttribute('value', config.text);
    element.setAttribute('scale', config.scale)
    element.setAttribute('look-at', '[gps-camera]');
    element.setAttribute('gps-entity-place', `latitude: ${config.location.latitude}; longitude: ${config.location.longitude};`);

    if (config.color) {
        element.setAttribute('color', config.color);
    }

    if (config.lookAt == '[camera]') {
        element.setAttribute('look-at', '[camera]');
    }
    else if (config.gestureConfig) {
        element.setAttribute('gesture-handler', 'minScale: 0.25; maxScale: 10');
        element.classList.add('clickable');
    }
    

    return element;
}

