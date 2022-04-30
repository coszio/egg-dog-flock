import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Boid } from './boid';

const loader = new GLTFLoader();

function onError(error: any) {
    console.error(error)
}


export class Eggdog extends Boid {
    constructor() {
        super();
        console.log("eggdog constructor");
        
        loader.load(
            'EggDog.glb',
            (gltf: GLTF) => {
                this.add(gltf.scene);
                this.animations = gltf.animations;
                console.log(gltf);
            },
            undefined,
            onError
        );

        // TODO: add animation

        // TODO: set object orientation, so that eggdogs point to the direction where they are going

    }
}
