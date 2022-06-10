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
                
const flock = new Flock(40)
scene.add(flock)

const grass = new Grass()
grass.scale.multiplyScalar(70)
grass.position.add(new THREE.Vector3(0,-10,0))
scene.add(grass)

//// placeholder ground /////
/*
const geometry = new THREE.PlaneGeometry( 180, 180 );
const material = new THREE.MeshBasicMaterial( {color: 107142035, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2)
scene.add( plane );
*/
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    flock.update()

    controls.update()

    render()
}

function render() {
    var timer = Date.now() * 0.0001

    scene.traverse( function (flock ) {
        if (!grass){
            flock.rotation.y = timer * 100;
        }

        if (grass){
           flock.rotation.y = timer * 0.5;
        }

    });

    renderer.render(scene, camera)
}
animate()
