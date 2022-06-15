import { AnimationAction, AnimationMixer, LoopRepeat } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Boid } from './boid';

const loader = new GLTFLoader();


function onError(error: any) {
    console.error(error)
}

export class Eggdog extends Boid {

    mixer: AnimationMixer | null = null;

    constructor() {
        super();        
        loader.load(
            'EggDog.glb',
            (gltf: GLTF) => {
                let eggdog = gltf.scene;
                this.mixer = new AnimationMixer(eggdog)

                const animationAction = this.mixer.clipAction(gltf.animations[0])
                animationAction.setEffectiveTimeScale(4).play();
                eggdog.scale.multiplyScalar(1.5);
                this.add(eggdog);
                this.animations = gltf.animations;
            },
            undefined,
            onError
        );
    }

    animate(delta: number) {
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }
}
