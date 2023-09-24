// Our canvas and the 'context'
const canvas = document.getElementById("main-canvas")
const ctx = canvas.getContext("2d")

// Some basic styles
canvas.style.border = "1px solid black"
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.fillStyle = `hsl(
    ${Math.random()*360},
    ${25 + Math.random()*75}%,
    ${Math.random()*80}%,
    ${0.25 + Math.random()*0.5}
)`
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

// Draw a Rectangle
// fillRect(x, y, width, height)
function drawRect(x, y, width = 100, height = 100, border = true) {
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
    ctx.fillRect(x, y, width, height)
    if (border) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x+width, y)
        ctx.lineTo(x+width, y+height)
        ctx.lineTo(x, y+height)
        ctx.lineTo(x, y)
        ctx.strokeStyle = "black"
        ctx.stroke()
        ctx.closePath()
    }
}

// Draw a Line
ctx.beginPath()
ctx.moveTo(100, 300)  // Starting point
ctx.lineTo(300, 100) // Where we go
ctx.lineTo(400, 200) // New vertex
ctx.strokeStyle = "#FA34A3"
ctx.stroke()

// Draw an arc/circle
// arc(x, y, radius, startAngle, endAngle, drawCounterClockwise)
ctx.beginPath()
ctx.arc(500, 500, 30, 0, Math.PI*2)
ctx.strokeStyle = "blue"
ctx.lineWidth = 5.0
ctx.fillStyle = "black"
ctx.stroke()
ctx.fill()

function drawCircle(x, y, r = 50) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI*2)
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 5.0
    ctx.fillStyle = "black"
    ctx.stroke()
    ctx.fill()
}

function manyRandomShapes(numberOfShapes = 3, shapeType) {
    for (let i = 0; i < numberOfShapes; i++) {
        const x = Math.random() * (window.innerWidth - 500) + 250
        const y = Math.random() * (window.innerHeight - 500) + 250
        if (shapeType === "circle") {
            const r = 25 + Math.random() * 225
            drawCircle(x, y, r)
        } else if (shapeType === "square"){
            const sideLength = 50 + Math.random() * 450
            drawRect(x, y, sideLength, sideLength)
        } else {
            const width = 50 + Math.random() * 450
            const height = 50 + Math.random() * 450
            drawRect(x, y, width, height)
        }
    }
}

manyRandomShapes(3, "circle")

console.log(canvas)