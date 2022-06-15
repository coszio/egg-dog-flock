import { Vector3, Object3D } from 'three';

export abstract class Boid extends Object3D {
    velocity = new Vector3(0, 0, 0)
    acceleration = new Vector3(0, 0, 0)
    maxForce = 0.4
    maxSpeed = 0.5
    radius = 60

    constructor() {
        super()
        this.position.set(
            (Math.random() - 0.5) * this.radius,
            0,
            (Math.random() - 0.5) * this.radius,
        )
        this.velocity.set(
            (Math.random() - 0.5) * 0.1,
            0,
            (Math.random() - 0.5) * 0.1,
        )
        this.acceleration.copy(this.acceleration)
    }

    update(otherBoids: Boid[], strength = 0.006) {
        otherBoids = this.getNeighbors(otherBoids, 15)
        this.separate(otherBoids, 0.5 * strength)
        this.align(otherBoids, 1.7 * strength)
        this.cohese(otherBoids, 0.7 * strength)
        this.move()
        this.constrain()
    }

    /**
     *
     * @param neighbors An array of other boids that do not include this boid
     * @param strength How strong is the boid's separation force
     * @returns void
     */
    separate(neighbors: Boid[], strength: number = 0.003): void {
        // if there are no boids nearby, return
        if (neighbors.length === 0) {
            return
        }
        // get the sum of distances to the other boids
        let steering = new Vector3(0, 0, 0)
        for (const other of neighbors) {
            let diff = this.position.clone().sub(other.position)
            // inversely proportional to the distance
            diff.divideScalar(other.position.distanceTo(this.position))
            steering.add(diff)
        }
        // steering.divideScalar(neighbors.length)
        steering.multiplyScalar(strength)

        this.acceleration.add(steering)
    }

    /**
     * Steers towards the average heading of the local flock
     *
     * @param neighbors An array of other neighboring boids
     * @returns void
     */
    align(neighbors: Boid[], strength: number = 0.011): void {
        let steering = new Vector3(0, 0, 0)

        if (neighbors.length === 0) {
            return
        }

        for (const other of neighbors) {
            steering.add(other.velocity)
        }
        // Steer towards the average direction
        steering.divideScalar(neighbors.length)
        steering.multiplyScalar(strength)

        this.acceleration.add(steering)
    }

    /**
     * Move towards the center of the local flock
     * @param otherBoids An array of other boids that do not include this boid
     * @param neighborDistance The distance to other boids that will be considered neighbors
     * @returns void
     */
    cohese(neighbors: Boid[], strength: number = 0.002): void {
        if (neighbors.length === 0) {
            return
        }
        let avgPosition = new Vector3(0, 0, 0)

        for (const other of neighbors) {
            avgPosition.add(other.position)
        }
        avgPosition.divideScalar(neighbors.length)

        // steer towards the average position
        let steering = avgPosition.sub(this.position)
        steering.multiplyScalar(strength)
        this.acceleration.add(steering)
    }

    /**
     * Updates the position of the boid using the current velocity and acceleration
     * @returns void
     */
    move() {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.clampLength(0, this.maxSpeed)
        this.acceleration.clampLength(0, this.maxForce)
        this.lookAt(this.position.clone().sub(this.acceleration))
        this.rotateOnAxis(new Vector3(0,1,0), Math.PI)
    }

    /**
     * Constrains the boid to the bounds of the scene
     * @returns void
     */
    constrain(height: number = 50) {
        let distToCenter = this.position.distanceTo(new Vector3(0, 0, 0))
        if (distToCenter > this.radius) {
            this.position.multiplyScalar(-0.99);
        }
    }

    /**
     * Gets the neighboring boids that can be perceived by this boid
     * @param otherBoids An array of boids
     * @param distance the maximum distance to be perceived by the boid
     * @param fov the angle of the boid's field of view, with respect to the pointing direction
     * @returns
     */
    getNeighbors(otherBoids: Boid[], distance: number = 10, fov: number = Math.PI / 1.5) {
        return otherBoids.filter((other) => {
            const vectorToOther = other.position.clone().sub(this.position)
            const angleToOther = this.velocity.angleTo(vectorToOther)
            return (
                other !== this &&
                this.position.distanceTo(other.position) < distance &&
                angleToOther < fov
            )
        })
    }
}
