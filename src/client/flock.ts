import * as THREE from 'three'
import { Boid } from './boid';

export class Flock extends THREE.Group {
  boids: Boid[] = [];


  constructor(n: number) {
    super();
    for (let i = 0; i < n; i++) {
      const boid = new Boid();
      this.boids.push(boid);
      this.add(boid);
    }
  }
  update() {
    this.boids.forEach((boid) => boid.update(this.boids));
  }
}