import { AnimationAction, Group } from 'three'
import { Eggdog } from './eggdog';

export class Flock extends Group {
  boids: Eggdog[] = [];
  animationActions: AnimationAction[] = [];


  constructor(n: number) {
    super();
    for (let i = 0; i < n; i++) {
      const boid = new Eggdog();
      this.boids.push(boid);
      this.add(boid);
    }
  }
  update() {
    this.boids.forEach((boid) => boid.update(this.boids));
  }
  animate(delta: number) {
    this.boids.forEach((boid) => {
      boid.animate(delta);
    });
  }
}

const flock = new Flock(10);

flock.update()