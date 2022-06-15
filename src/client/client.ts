import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Flock } from './flock'
import { Grass } from './grass'

const scene = new THREE.Scene()

//===========================================
const loader = new THREE.TextureLoader();
loader.load('skybox.jpg', (texture) => {
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide
    });
    const geometry = new THREE.SphereGeometry(500, 32, 32);
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
});
//============================================

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.z = 100
camera.position.y = 50

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 20, 0 );
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( - 3, 10, - 10 );
dirLight.castShadow = true;
dirLight.shadow.camera.top = 2;
dirLight.shadow.camera.bottom = - 2;
dirLight.shadow.camera.left = - 2;
dirLight.shadow.camera.right = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
                
scene.add(dirLight);
                
const flock = new Flock(30)
scene.add(flock)

const grass = new Grass()
grass.scale.multiplyScalar(50)
grass.position.add(new THREE.Vector3(0,-10,0))
scene.add(grass)


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

var angle = 0;
var radius = camera.position.z;
var clock = new THREE.Clock();

function rotateCamera() {
    // camera.position.z = radius * Math.cos(angle);
    camera.position.x = radius * Math.sin(angle);
    angle += 0.01;
}
function animate() {
    requestAnimationFrame(animate)

    flock.update();
    flock.animate(clock.getDelta())

    controls.update()

    rotateCamera()
    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()
