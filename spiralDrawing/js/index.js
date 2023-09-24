// Our canvas and the 'context'
const canvas = document.getElementById("main-canvas")
const ctx = canvas.getContext("2d")
let shouldStopAnimation = false


// Some basic styles
// canvas.style.border = "1px solid white";
canvas.width = window.innerWidth * .99;
canvas.height = window.innerHeight * .99;
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);


const centerCanvasPoint = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}
        startTime = Date.now()

const cartesianPointsOnSpiral = [centerCanvasPoint]
let linesDrawingComplete = false
function animatePolarEquationWithLines() {
    
    const totalMillisecondsElapsed = (Date.now() - startTime)
    const angleRadians = totalMillisecondsElapsed * .005
    
    if (angleRadians > 45) {
        linesDrawingComplete = true
    }
    
    if (!linesDrawingComplete) {
        // const newRelativePoint = generateArchimedeanSpiralCartesionPoint(angleRadians, 5)
        const newRelativePoint = generateFibonacciSpiralCartesianPoint(angleRadians, 1, .1)

        const newPoint = {
            x: centerCanvasPoint.x + newRelativePoint.x,
            y: centerCanvasPoint.y + newRelativePoint.y,
        }
        cartesianPointsOnSpiral.push(newPoint)
    }
    
    rotateCanvasFromCenter(canvas, ctx, -1*(angleRadians % (2*Math.PI)))
    
    lineStartingPoint = cartesianPointsOnSpiral[0]
    cartesianPointsOnSpiral.forEach((newPoint, index) => {
            const lineWidthWide = 1200
            // const lineWidthWide = Math.floor(index / 100) + 1
            // const lineWidthThin = Math.floor(Math.pow(index, 2) / 8000) + 1
            // drawLine(ctx, lineStartingPoint, newPoint, '#0000FF', lineWidthWide)
            // drawLine(ctx, lineStartingPoint, newPoint, '#00FF00', lineWidthThin)
            // drawLine(ctx, lineStartingPoint, newPoint, '#FF0000')
            drawLine(ctx, lineStartingPoint, newPoint, '#FFFFFF', lineWidthWide)
            lineStartingPoint = newPoint
        })
    // drawLine(ctx, centerCanvasPoint, newPoint)

    rotateCanvasFromCenter(canvas, ctx, (angleRadians % (2*Math.PI)))
}


const polarPointsOnSpiral = [{radius: 0, angle: 0}]
let arcsDrawingComplete = false
function animatePolarEquationWithArcs() {
    if (arcsDrawingComplete) return;

    const totalMillisecondsElapsed = (Date.now() - startTime)
    const angleRadians = totalMillisecondsElapsed * .005
    console.log(angleRadians % (2*Math.PI))

    if (angleRadians > 130) {
        arcsDrawingComplete = true
    }

    if (arcsDrawingComplete) {
        polarPointsOnSpiral.push(generateFibonacciSpiralPolarPoint(
            angleRadians,
            1,
            .1
        ))
    }

    rotateCanvasFromCenter(canvas, ctx, -1*(angleRadians % (2*Math.PI)))
    
    let previousPolarPointOnSpiral = polarPointsOnSpiral[0]
    polarPointsOnSpiral.forEach((newPolarPoint, index) => {
            const lineWidth = Math.floor(newPolarPoint.angle / (2*Math.PI)) + 1
            drawArc(
                ctx,
                centerCanvasPoint,
                newPolarPoint.radius,
                previousPolarPointOnSpiral.angle,
                newPolarPoint.angle,
                '#8888FF',
                lineWidth
            )
            previousPolarPointOnSpiral = newPolarPoint
        })

    rotateCanvasFromCenter(canvas, ctx, (angleRadians % (2*Math.PI)))
}


function main() {

    if (shouldStopAnimation) return;
    // Clear the canvas so we can redraw the spiral up to the current new point
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    animatePolarEquationWithLines()
    // animatePolarEquationWithArcs()
    // drawCartesianAxes(ctx, canvas.height, canvas.width)

    requestAnimationFrame(main)
}

main()


let epochTimePaused = 0 
window.addEventListener('keydown', event => {
    if (event.key === ' ' && !shouldStopAnimation) {
        shouldStopAnimation = true
        epochTimePaused = Date.now()
    } else if (event.key === ' ' && shouldStopAnimation) {
        shouldStopAnimation = false
        const millisecondsElapsedSincePause = Date.now() - epochTimePaused
        startTime += millisecondsElapsedSincePause
        main()
    }
})