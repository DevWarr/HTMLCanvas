/*
depends on { Point } from "js/models/Point.js"
*/

class SpiralPointGenerator {
    constructor() {}
    
    /**
     * Generates X and Y coordinates from the equation `r = mθ + a`
     * 
     * @param {number} theta 
     * @param {number} multiplier The value of `m` in the equation. Defaults to `1`
     * @param {number} addition The value of `a` in the equation. Defaults to `0`
     */
    generateArchimedeanSpiralPoint = (theta, multiplier=1, addition=0) => {
        return new Point({
            angle: theta,
            radius: (multiplier * theta) + addition,
            x: ((multiplier * theta) + addition) * Math.cos(theta),
            y: ((multiplier * theta) + addition) * Math.sin(theta),
        })
    }
    
    
    /**
     * Generates a polar point from the equation `r = ( a * e^(bθ) ) + m`
     * 
     * @param {number} theta 
     * @param {number} a The value of `a` in the equation. Defaults to `1`
     * @param {number} b The value of `b` in the equation. Defaults to `1`
     * @param {number} addition The value of `m` in the equation. Defaults to `0`
     */
    generateFibonacciSpiralPoint = (theta, a=1, b=1, addition=0) => {
        return new Point({
            angle: theta,
            radius: (a * Math.pow(Math.E, b * theta)) + addition,
            x: ((a * Math.pow(Math.E, b * theta)) + addition) * Math.cos(theta),
            y: ((a * Math.pow(Math.E, b * theta)) + addition) * Math.sin(theta),
        })
    }
}
