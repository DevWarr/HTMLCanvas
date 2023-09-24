/*
depends on { Point } from "js/models/Point.js"
*/

class PolarEquationAnimatorWithLines {
    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D}} canvas2dContext 
     * @param {CanvasDrawer} canvasDrawingUtilities 
     */
    constructor(
        canvas,
        canvas2dContext,
        canvasDrawingUtilites,
        spiralPointGenerator,
    ) {
        this.canvas = canvas
        this.canvas2dContext = canvas2dContext
        this.canvasDrawingUtilites = canvasDrawingUtilites
        this.spiralPointGenerator = spiralPointGenerator

        this.startTime = Date.now()
        
        this.cartesianPointsOnSpiral = [
            new Point({
                x: 0,
                y: 0,
                radius: 0,
                angle: 0
            })
        ]
        this.drawingComplete = false
    }
    
    drawPolarEquation = (angleRadians) => {
        this.canvasDrawingUtilites.rotateCanvasFromCenter(-1*(angleRadians % (2*Math.PI)))
        
        let prevCartesianPointOnSpiral = this.cartesianPointsOnSpiral[0]
        this.cartesianPointsOnSpiral.forEach((newPoint, index) => {
                const lineWidthWide = 1
                // const lineWidthWide = Math.floor(index / 100) + 1
                // const lineWidthThin = Math.floor(Math.pow(index, 2) / 8000) + 1
                // this.canvasDrawingUtilites.drawLineRelativeToCanvasCenter(prevCartesianPointOnSpiral, newPoint, '#0000FF', lineWidthWide)
                // this.canvasDrawingUtilites.drawLineRelativeToCanvasCenter(prevCartesianPointOnSpiral, newPoint, '#00FF00', lineWidthThin)
                // this.canvasDrawingUtilites.drawLineRelativeToCanvasCenter(prevCartesianPointOnSpiral, newPoint, '#FF0000')
                this.canvasDrawingUtilites.drawLineRelativeToCanvasCenter(prevCartesianPointOnSpiral, newPoint, '#FFFFFF', lineWidthWide)
                prevCartesianPointOnSpiral = newPoint
            })
    
        this.canvasDrawingUtilites.rotateCanvasFromCenter((angleRadians % (2*Math.PI)))
    }

    animatePolarEquation = () => {
        const totalMillisecondsElapsed = (Date.now() - this.startTime)
        const angleRadians = totalMillisecondsElapsed * .005
        
        if (angleRadians > 130) {
            this.drawingComplete = true
        }
        
        if (!this.drawingComplete) {
            const newPoint = this.spiralPointGenerator.generateFibonacciSpiralPoint(angleRadians, 2, .1)
            this.cartesianPointsOnSpiral.push(newPoint)
        }
        
        this.drawPolarEquation(angleRadians)
    }

}
