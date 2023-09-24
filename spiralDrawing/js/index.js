/*
depends on { CanvasDrawer } from "js/CanvasDrawer.js"
depends on { SpiralPointGenerator } from "js/SpiralPointGenerator.js"
depends on { PolarEquationAnimatorWithLines } from "js/equationAnimators/PolarEquationAnimatorWithLines.js"
depends on { PolarEquationAnimatorWithArcs } from "js/equationAnimators/PolarEquationAnimatorWithArcs.js"
*/


class MainCanvasLoop {
    constructor() {
        // Setting up dependencies
        const canvas = document.getElementById('main-canvas')
        const ctx = canvas.getContext('2d')
        this.canvasDrawer = new CanvasDrawer(canvas, ctx)

        this.spiralPointGenerator = new SpiralPointGenerator()
        this.polarEquationAnimator = new PolarEquationAnimatorWithLines(
        // this.polarEquationAnimator = new PolarEquationAnimatorWithArcs(
            this.canvasDrawer.canvas,
            this.canvasDrawer.canvasContext,
            this.canvasDrawer,
            this.spiralPointGenerator,
        )

        // Functionality to pause and unpause the animation
        this.isAnimationRunning = true
        this.epochTimePaused = 0
        window.addEventListener('keydown', this.handleKeyDownToPause)
    }

    handleKeyDownToPause = (event) => {
        if (event.key === ' ' && this.isAnimationRunning) {
            this.isAnimationRunning = false
            this.epochTimePaused = Date.now()
        } else if (event.key === ' ' && !this.isAnimationRunning) {
            this.isAnimationRunning = true

            const millisecondsElapsedSincePause = Date.now() - this.epochTimePaused
            this.polarEquationAnimator.startTime += millisecondsElapsedSincePause
            
            // We don't really need to reset this to 0, but I feel like it's a safer option than keeping it as some larger number
            this.epochTimePaused = 0
            // Restart the main loop
            this.runMainLoop()
        }
    }

    runMainLoop = () => {
        if (!this.isAnimationRunning) return;

        // Clear the canvas so we can redraw the spiral up to the current new point
        this.canvasDrawer.clearCanvas()

        this.polarEquationAnimator.animatePolarEquation()
        // this.canvasDrawer.drawCartesianAxes()

        requestAnimationFrame(this.runMainLoop)
    }
}

new MainCanvasLoop().runMainLoop()
