import { Mesh, Object3D } from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier'

const loader = new GLTFLoader();


function onError(error: any) {
    console.error(error)
}

export class Grass extends Object3D {
        constructor() {
            super()
            console.log("grass constructor");

            loader.load(
                'grass.glb',
                (gltf: GLTF) => {
                    const grass = gltf.scene.children[0]
                    this.add(grass);
                },
                undefined,
                onError
            );
        }
}



