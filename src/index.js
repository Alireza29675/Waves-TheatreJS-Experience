import {
    Animation
} from './Animation';

class Experience {

    constructor(container) {
        this.container = container;
        this.animation = new Animation(this.container, window.innerWidth, window.innerHeight);
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        this.animation.resize(window.innerWidth, window.innerHeight);
    }

    goFullScreen () {
        const element = this.container;
        if (element.requestFullscreen) element.requestFullscreen();
        else if (element.msRequestFullscreen) element.msRequestFullscreen();
        else if (element.mozRequestFullScreen) elem.mozRequestFullScreen();
        else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
    }

}

window.experience = new Experience(document.querySelector('#app'));