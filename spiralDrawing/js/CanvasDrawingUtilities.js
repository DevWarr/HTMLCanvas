/**
 * Given a starting and ending point, draws a line between the two.
 * 
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {{x: number, y: number}} startingPoint
 * @param {{x: number, y: number}} endingPoint 
 * @param {string} strokeColor Color of the line to draw
 * @param {number} lineWidth Width of the line in pixels
 */
function drawLine(
    canvasContext,
    startingPoint,
    endingPoint,
    strokeColor='#FFFFFF',
    lineWidth=1,
) {
    canvasContext.beginPath()
    canvasContext.moveTo(startingPoint.x, startingPoint.y)
    canvasContext.lineTo(endingPoint.x, endingPoint.y)
    canvasContext.strokeStyle = strokeColor
    canvasContext.lineWidth = lineWidth
    canvasContext.stroke()
}


/**
 * Function to make drawing an arc a little easier.
 * 
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {{x: number, y: number}} startingPoint
 * @param {number} radius 
 * @param {number} startingAngle
 * @param {number} endingAngle
 * @param {string} strokeColor Color of the arc to draw
 * @param {number} lineWidth Width of the arc line in pixels
 */
function drawArc(
    canvasContext,
    startingPoint,
    radius,
    startingAngle,
    endingAngle,
    strokeColor='#FFFFFF',
    lineWidth=1,
) {
    canvasContext.beginPath()
    canvasContext.arc(startingPoint.x, startingPoint.y, radius, startingAngle, endingAngle)
    canvasContext.strokeStyle = strokeColor
    canvasContext.lineWidth = lineWidth
    canvasContext.stroke()
}


/**
 * Draws a single point on a canvas
 * 
 * @param {CanvasRenderingContext2D} canvasContext 
 * @param {{x: number, y: number}} newPoint 
 */
function drawPoint(canvasContext, newPoint) {
    canvasContext.fillStyle = "#FFFFFF"
    canvasContext.fillRect(newPoint.x, newPoint.y, 1, 1)
}


/**
 * Rotates the canvas at the center.
 * 
 * Resets the canvas origin back to 0, 0 after rotation is complete.
 * 
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {number} rotationRadians
 * @param {HTMLCanvasElement} canvas The canvas HTML elemnt itself
 */
function rotateCanvasFromCenter(canvas, canvasContext, rotationRadians) {
    canvasContext.translate(canvas.width / 2, canvas.height / 2)
    canvasContext.rotate(rotationRadians)
    canvasContext.translate(-1 * (canvas.width / 2), -1 * (canvas.height / 2))
}


/**
 * Draws X and Y axes on the canvas
 * 
 * Good for reference - not needed for final spiral animation
 * 
 * @param {CanvasRenderingContext2D} canvasContext 
 * @param {number} canvasHeight 
 * @param {number} canvasWidth 
 */
function drawCartesianAxes(canvasContext, canvasHeight, canvasWidth) {
    
    // Drawing X axis
    const startingPointXAxis = {
        x: 0,
        y: canvasHeight / 2
    }
    const endingPointXAxis = {
        x: canvasWidth,
        y: canvasHeight / 2
    }
    drawLine(canvasContext, startingPointXAxis, endingPointXAxis)

    // Drawing Y axis
    const startingPointYAxis = {
        x: canvasWidth / 2,
        y: 0,
    }
    const endingPointYAxis = {
        x: canvasWidth / 2,
        y: canvasHeight,
    }
    drawLine(canvasContext, startingPointYAxis, endingPointYAxis)
}
