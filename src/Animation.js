import {
    Sound
} from './tools/Sound';

import animationState from './theatre/theatre-export.json';
import {
    particlesProps,
    cameraProps
} from './theatre/theatre-props';
import {
    Knot
} from './tools/Knot';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export class Animation {

    constructor(container, width, height) {
        this.knot = new Knot(container, width, height);
        this.initializeTheatre();
        window.addEventListener('load', this.initializeAudio.bind(this));
    }

    initializeTheatre() {
        this.theatre = {};
        this.theatre.project = new Theatre.Project('Max Cooper - Waves', {
            state: animationState
        });
        this.theatre.timeline = this.theatre.project.getTimeline('Timeline');
        this.initializeTheatreForParticles();
        this.initializeTheatreForCamera();
    }

    initializeTheatreForParticles() {
        const object = this.theatre.timeline.createObject('Particles', this.knot.state, particlesProps);
        object.onValuesChange(values => {
            for (let key in values) this.knot.state[key] = values[key];
            this.knot.renderer.domElement.style.filter = `hue-rotate(${values.hue}deg) brightness(${values.brightness})`;
            this.knot.draw();
        });
    }

    initializeTheatreForCamera() {
        const object = this.theatre.timeline.createObject('Camera', this.knot.camera, cameraProps);
        object.onValuesChange(values => {
            this.knot.camera.position.x = values.positionX;
            this.knot.camera.position.y = values.positionY;
            this.knot.camera.position.z = values.positionZ;
            this.knot.camera.lookAt(new THREE.Vector3(10, 0, 0));
        })
    }

    initializeAudio() {
        this.sound = new Sound('./audio/waves-maxcooper-lq.mp3');
        this.sound.ready().then(() => this.render());
    }

    syncAudio() {
        if (this.theatre.timeline.playing && !this.sound.playing) {
            this.sound.currentTime = this.theatre.timeline.time;
            this.sound.play();
        } else if (!this.theatre.timeline.playing && this.sound.playing) {
            this.sound.pause();
        }
    }

    resize(width, height) {
        this.knot.resize(width, height);
    }

    play() {
        this.theatre.timeline.play();
    }

    pause() {
        this.theatre.timeline.pause();
    }

    ready() {
        return this.theatre.project.ready;
    }

    render() {
        this.knot.render();
        this.syncAudio();
        requestAnimationFrame(this.render.bind(this));
    }

}