import * as THREE from 'three'
import { Eggdog } from './eggdog';

export class Flock extends THREE.Group {
  boids: Eggdog[] = [];


  constructor(n: number) {
    super();
    for (let i = 0; i < n; i++) {
      const boid = new Eggdog();
      boid.animations
      this.boids.push(boid);
      this.add(boid);
    }
  }
  update() {
    this.boids.forEach((boid) => boid.update(this.boids));
  }
}