class CanvasDrawer {
    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {CanvasRenderingContext2D} canvasContext 
     */
    constructor(canvas, canvasContext) {
        // Our canvas and the 'context'
        this.canvas = canvas
        this.canvasContext = canvasContext

        // Some basic styles
        this.canvas.width = window.innerWidth * 0.99
        this.canvas.height = window.innerHeight * 0.99
        this.canvasContext.fillStyle = '#000000'
        this.canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight)
    }

    /**
     * Given a starting and ending point, draws a line between the two.
     * 
     * @param {Point} startingPoint
     * @param {Point} endingPoint 
     * @param {string} strokeColor Color of the line to draw
     * @param {number} lineWidth Width of the line in pixels
     */
    drawLineAbsolute = (
        startingPoint,
        endingPoint,
        strokeColor = '#FFFFFF',
        lineWidth = 1,
    ) => {
        this.canvasContext.beginPath()
        this.canvasContext.moveTo(startingPoint.x, startingPoint.y)
        this.canvasContext.lineTo(endingPoint.x, endingPoint.y)
        this.canvasContext.strokeStyle = strokeColor
        this.canvasContext.lineWidth = lineWidth
        this.canvasContext.stroke()
    }

    /**
     * Given a starting and ending point, draws a line between the two.
     * 
     * @param {Point} startingPoint
     * @param {Point} endingPoint 
     * @param {string} strokeColor Color of the line to draw
     * @param {number} lineWidth Width of the line in pixels
     */
    drawLineRelativeToCanvasCenter = (
        startingPoint,
        endingPoint,
        strokeColor = '#FFFFFF',
        lineWidth = 1,
    ) => {
        this.canvasContext.beginPath()
        this.canvasContext.moveTo(
            (this.canvas.width / 2) + startingPoint.x,
            (this.canvas.height / 2) + startingPoint.y
        )
        this.canvasContext.lineTo(
            (this.canvas.width / 2) + endingPoint.x,
            (this.canvas.height / 2) + endingPoint.y
        )
        this.canvasContext.strokeStyle = strokeColor
        this.canvasContext.lineWidth = lineWidth
        this.canvasContext.stroke()
    }
    
    
    /**
     * Function to make drawing an arc a little easier.
     * 
     * @param {Point} startingPoint
     * @param {Point} endingPoint
     * @param {string} strokeColor Color of the arc to draw
     * @param {number} lineWidth Width of the arc line in pixels
     */
    drawArcRelativeToCanvasCenter = (
        startingPoint,
        endingPoint,
        strokeColor = '#FFFFFF',
        lineWidth = 1,
    ) => {
        this.canvasContext.beginPath()
        this.canvasContext.arc(
            (this.canvas.width / 2) + startingPoint.x,
            (this.canvas.height / 2) + startingPoint.y,
            endingPoint.radius,
            startingPoint.angle,
            endingPoint.angle
        )
        this.canvasContext.strokeStyle = strokeColor
        this.canvasContext.lineWidth = lineWidth
        this.canvasContext.stroke()
    }
    
    
    /**
     * Draws a single point on a canvas
     * 
     * @param {Point} newPoint 
     */
    drawPointAbsolute = (newPoint) => {
        this.canvasContext.fillStyle = "#FFFFFF"
        this.canvasContext.fillRect(newPoint.x, newPoint.y, 1, 1)
    }
    
    
    /**
     * Rotates the canvas at the center.
     * 
     * Resets the canvas origin back to 0, 0 after rotation is complete.
     * 
     * @param {number} rotationRadians
     */
    rotateCanvasFromCenter = (rotationRadians) => {
        this.canvasContext.translate(this.canvas.width / 2, this.canvas.height / 2)
        this.canvasContext.rotate(rotationRadians)
        this.canvasContext.translate(-1 * (this.canvas.width / 2), -1 * (this.canvas.height / 2))
    }
    
    
    /**
     * Draws X and Y axes on the canvas
     * 
     * Good for reference - not needed for final spiral animation
     */
    drawCartesianAxes = () => {
        
        // Drawing X axis
        const startingPointXAxis = {
            x: 0,
            y: this.canvas.height / 2
        }
        const endingPointXAxis = {
            x: this.canvas.width,
            y: this.canvas.height / 2
        }
        this.drawLineAbsolute(startingPointXAxis, endingPointXAxis)
    
        // Drawing Y axis
        const startingPointYAxis = {
            x: this.canvas.width / 2,
            y: 0,
        }
        const endingPointYAxis = {
            x: this.canvas.width / 2,
            y: this.canvas.height,
        }
        this.drawLineAbsolute(startingPointYAxis, endingPointYAxis)
    }

    /**
     * Clears the canvas.
     * 
     * Useful when the full canvas needs to be redrawn.
     */
    clearCanvas = () => {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
