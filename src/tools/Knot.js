export class Knot {

    constructor(container, width, height) {
        this.container = container;
        this.width = width;
        this.height = height;
        this.knot = null;

        this.state = {
            radius: 40,
            tube: 28.2,
            radialSegments: 600,
            tubularSegments: 12,
            p: 5,
            q: 4,
            heightScale: 4,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            size: 3,
            brightness: 1
        }

        this.init();
    }

    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.camera.position.x = -30;
        this.camera.position.y = 40;
        this.camera.position.z = 50;

        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(new THREE.Color(0x000000, 1.0));
        this.renderer.shadowMapEnabled = true;
        this.container.appendChild(this.renderer.domElement);
    }

    draw() {
        if (this.knot) this.scene.remove(this.knot);
        const geometry = new THREE.TorusKnotGeometry(
            this.state.radius,
            this.state.tube,
            Math.max(0, Math.round(this.state.radialSegments)),
            Math.round(this.state.tubularSegments),
            this.state.p,
            this.state.q,
            this.state.heightScale
        );
        this.knot = this.createPointCloud(geometry);
        this.scene.add(this.knot);
    }

    createPointCloud(geometry) {
        const material = new THREE.PointCloudMaterial({
            color: 0xffffff,
            size: this.state.size,
            transparent: true,
            blending: THREE.AdditiveBlending,
            map: this.generateSprite()
        });
        const cloud = new THREE.PointCloud(geometry, material);
        cloud.sortParticles = true;
        return cloud;
    }

    generateSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    changes() {
        if (this.knot) {
            this.knot.rotation.x = this.state.rotationX + mouse.rateY / 5;
            this.knot.rotation.y = this.state.rotationY + mouse.rateX / 10;
            this.knot.rotation.z = this.state.rotationZ;
            this.knot.position.x = this.state.positionX;
            this.knot.position.y = this.state.positionY;
            this.knot.position.z = this.state.positionZ;
        }
    }

    render() {
        this.changes();
        this.renderer.render(this.scene, this.camera);
    }

}

const mouse = {
    x: 0,
    y: 0,
    rateX: 0,
    rateY: 0
}

window.addEventListener('mousemove', (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.rateX = (mouse.x / w) - 0.5;
    mouse.rateY = (mouse.y / h) - 0.5;
})