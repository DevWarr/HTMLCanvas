/**
 * A Point on the canvas with both polar and catersian coordinates.
 */
class Point {
    /**
     * @param {{x: number, y: number, radius: number, angle: number}} attr 
     */
    constructor(attr) {
        this.x = attr.x
        this.y = attr.y
        this.radius = attr.radius
        this.angle = attr.angle
    }

    getXRelativeToCanvasCenter = (canvas) => {
        return (canvas.width / 2) + this.x
    }

    getYRelativeToCanvasCenter = (canvas) => {
        return (canvas.width / 2) + this.y
    }
}
