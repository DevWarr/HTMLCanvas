const shapeType = ["circle", "square", "circle", "rectangle"]
const randomShape = () => shapeType[Math.floor(Math.random() * shapeType.length)]
const randomNumber = (MIN, MAX) => MIN + Math.floor(Math.random() * (MAX-MIN))

const btn = document.getElementById("redraw")
btn.addEventListener("click", e => {
    e.preventDefault()
    manyRandomShapes(randomNumber(1, 8), randomShape())
})

console.log(randomShape())