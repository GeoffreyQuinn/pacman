const textToImg = {
    '-' : './images/pipeHorizontal.png',
    '|' : './images/pipeVertical.png',
    '1' : './images/pipeCorner1.png',
    '2' : './images/pipeCorner2.png',
    '3' : './images/pipeCorner3.png',
    '4' : './images/pipeCorner4.png',
    'b' : './images/block.png',
    '[' :  './images/capLeft.png',
    ']' : './images/capRight.png',
    '_' : './images/capBottom.png',
    '^' : './images/capTop.png',
    '+' : './images/pipeCross.png',
    '5' : './images/pipeConnectorTop.png',
    '6' : './images/pipeConnectorRight.png',
    '7' : './images/pipeConnectorBottom.png',
    '8' : './images/pipeConnectorLeft.png'
}

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const fps = 50
const blockSize = 50
const foods = []
const boundaries = []
const map = [['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
             ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
             ['|', '.', '.', '.', '.', '.', '.', '[', '-', ']', '.', '|'],
             ['|', '.', '[', '-', '-', ']', '.', '.', '.', '.', '.', '|'],
             ['|', '.', '.', '.', '.', '.', '.', '.', '.', '^', '.', '|'],
             ['|', '.', '.', '1', '-', '2', '.', '.', '.', '|', '.', '|'],
             ['|', '.', '[', '3', '.', '4', ']', '.', '.', '|', '.', '|'],
             ['|', '.', '.', '.', '.', '.', '.', '.', '.', '|', '.', '|'],
             ['|', '.', '.', '.', '.', '.', '.', '[', '-', '3', '.', '|'],
             ['|', '.', '[', '-', '-', ']', '.', '.', '.', '.', '.', '|'],
             ['|', '.', '.', '.', '.', '.', '.', '[', '-', ']', '.', '|'],
             ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
             ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']]

canvas.width = map[0].length * blockSize
canvas.height = map.length * blockSize

class Boundary{
    constructor(pos, src){
        this.pos = pos
        this.img = new Image(blockSize, blockSize)
        this.img.src = src
    }
    draw(){
        ctx.drawImage(this.img, this.pos.x, this.pos.y, blockSize, blockSize)
    }
}

class Food{
    constructor(pos){
        this.radius = 5
        this.pos = pos
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI *2)
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.closePath()
    }
}

for (let i in map){
    for (let j in map[i]){
        if (map[i][j] != '.'){
            boundaries.push(new Boundary({x:j*blockSize , y:i*blockSize}, textToImg[map[i][j]]))
        }
        else{
            foods.push(new Food({x:j*blockSize + blockSize/2, y:i*blockSize + blockSize/2}))
        }
    }
}


function draw(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, map[0].length * blockSize, map.length * blockSize)
    for (let i in boundaries){
        boundaries[i].draw()
    }
    for (let i in foods){
        foods[i].draw()
    }
}


setInterval(draw, 1000 / fps)


