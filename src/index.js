fs = require('fs');

puzzle1 = () => {
    console.log("Solving puzzle 1")
    fs.readFile("src/inputs/1-1", "utf-8", (err, data) => {
        let arr = data.split('\n').map(x => parseInt(x))
        console.log(arr.length + " - " + arr[arr.length - 1])
        let count = 0
        for (let i = 3; i < arr.length; i++) {
            let sum = (arr[i-3] + arr[i-2] + arr[i-1])
            let sum2 = (arr[i-2] + arr[i-1] + arr[i])
            console.log(`Comparing ${sum} and ${sum2}`)
            if (sum2 > sum) {
                count++
            }
        }
        console.log(count)
    })

}

puzzle2 = () => {
    console.log("Solving puzzle 1")
    fs.readFile("src/inputs/2", "utf-8", (err, data) => {
        let arr = data.split("\n")
        let horizontalPos = 0
        let depth = 0
        let aim = 0
        for (let i = 0; i < arr.length; i++) {
            let order = arr[i].split(" ")[0]
            let value = parseInt(arr[i].split(" ")[1])
            switch(order) {
                case 'forward' : 
                    horizontalPos += value
                    depth += (value * aim)
                    break;
                case 'down' : 
                    aim += value
                    break;
                case 'up' : 
                    aim -= value
                    break;
            }
        }
        console.log(`Horizontal ${horizontalPos} / depth ${depth}`)
        console.log(` ${horizontalPos * depth} `)
    })
}

puzzle4 = () => {
    
}

// puzzle1()
// puzzle2()

puzzle4()