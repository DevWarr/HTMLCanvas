/*
depends on { Point } from "js/models/Point.js"
*/

class PolarEquationAnimatorWithArcs {
    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D}} canvas2dContext 
     * @param {CanvasDrawer} canvasDrawingUtilities 
     */
    constructor(
        canvas,
        canvas2dContext,
        canvasDrawingUtilities,
        spiralPointGenerator,
    ) {
        this.canvas = canvas
        this.canvas2dContext = canvas2dContext
        this.canvasDrawingUtilities = canvasDrawingUtilities
        this.spiralPointGenerator = spiralPointGenerator

        this.polarPointsOnSpiral = [
            new Point({
                x: 0,
                y: 0,
                radius: 0,
                angle: 0,
            })
        ]
        this.startTime = Date.now()
        this.drawingComplete = false
    }
    
    drawPolarEquation = (angleRadians) => {
        this.canvasDrawingUtilities.rotateCanvasFromCenter(-1*(angleRadians % (2*Math.PI)))
        
        let previousPolarPointOnSpiral = this.polarPointsOnSpiral[0]
        this.polarPointsOnSpiral.forEach((newPolarPoint, index) => {
                const lineWidth = 1
                // const lineWidth = Math.floor(newPolarPoint.angle / (2*Math.PI)) + 1
                this.canvasDrawingUtilities.drawArcRelativeToCanvasCenter(
                    previousPolarPointOnSpiral,
                    newPolarPoint,
                    '#FFFFFF',
                    lineWidth
                )
                previousPolarPointOnSpiral = newPolarPoint
            })
    
            this.canvasDrawingUtilities.rotateCanvasFromCenter((angleRadians % (2*Math.PI)))
    }

    /**
     * Animates a polar equation with the `drawArcRelativeToCanvasCenter` method.
     * 
     * Updates this.polarPointsOnSpiral and then plots points based on that list
     */
    animatePolarEquation = () => {
        const totalMillisecondsElapsed = (Date.now() - this.startTime)
        const angleRadians = totalMillisecondsElapsed * .005
    
        if (angleRadians > 130) {
            this.drawingComplete = true
        }
    
        if (!this.drawingComplete) {
            const newPolarPoint = this.spiralPointGenerator.generateFibonacciSpiralPoint(angleRadians, 1, .1)
            this.polarPointsOnSpiral.push(newPolarPoint)
        }

        this.drawPolarEquation(angleRadians)
    }
}
