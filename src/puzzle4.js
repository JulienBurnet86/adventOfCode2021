const _ = require('lodash');
fs = require('fs');


function boardObject(boardArray, number) {
  return {
    board: boardArray,
    number: number,
    applyDrawing: function(draw) {
      this.board = this.board.map(line => line.map(a => a == draw ? null : a))
    },
    isWinner: function() {
      // if a line contains only null values or a column contains only null values
      for (let col=0; col < this.board[0].length; col++) {
        var nullColumns = true
        for (let line in this.board) {
          const curLine = this.board[line]
          if (curLine[col]) {
            nullColumns = false
            break
          }
        }
        if (nullColumns) return true
      }
      return this.board.filter(a => a.filter(b => b != null).length == 0).length != 0
    },
    getUnmarkedSum: function() {
        // filtering out null lines
        return this.board
            .filter(l => l.filter(a => a).length)
            .map(l =>l.filter(a => a).map(a => parseInt(a)).reduce((a,b) => a+b))
            .map(a => parseInt(a))
            .reduce((a,b) => a+b)
    }
  }
  
}

function formatData(data) {
 let splittedData = _.split(data, '\n')
 let res = {
   drawing : splittedData[0].split(','),
   boards : []
 }
 
 for (let i = 1; i < splittedData.length; i++) {
   var line = splittedData[i]
   let board = new Array(5)
   let j = 0
   if (line == '') continue
   while (line) {
     board[j++] = line.split(" ").filter(a => a)
     line = splittedData[++i]
   }
   if (board) {     
    res.boards.push(boardObject(board, res.boards.length))
   }
 }
 return res
}

const content = fs.readFileSync("src/inputs/4")

let formattedData = formatData(content)

console.log(`formattedData `, JSON.stringify(formattedData, null, 2))
// console.log(`drawing `, formattedData.drawing)

let hasWinner = false
while (formattedData.drawing.length && !hasWinner) {
  let draw = formattedData.drawing.shift()
  console.log(`draw: ${draw}`)
  formattedData.boards.every(b => {
    b.applyDrawing(draw)
    if (b.isWinner()) {
      console.log(`${b.number} is winner !!!`)
      console.log(`winner board:`, b.board)
      console.log(`${b.getUnmarkedSum()}`)
      console.log(`result is ${b.getUnmarkedSum() * parseInt(draw)}`)
      hasWinner = true
      return false
    }
    return true
  })
}

