import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader();


function onError(error: any) {
    console.error(error)
}

export class Grass extends THREE.Object3D {
        constructor() {
            super()
            console.log("grass constructor");

            loader.load(
                'grass.glb',
                (gltf: GLTF) => {
                    this.add(gltf.scene);
                    this.animations = gltf.animations;
                    console.log(gltf);
                },
                undefined,
                onError
            );
        }
}



