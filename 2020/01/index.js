import data from './puzzleInput.js'


console.log('https://adventofcode.com/2020/day/1')
function sum2020(number, array) {
  for (let n of array) {
    if (n + number === 2020) {
      console.log({number, n})
      console.log(`number x n = ${number*n}`)
    }
  }
}
let array = [...data]
while (array.length > 1) {
  const number = array.pop()
  sum2020(number, array)
}

/////////////////////////
console.log('https://adventofcode.com/2020/day/2')
function sum2020_2(number, array) {
  const arrayCopy = [...array]
  arrayCopy.unshift()
  for (let n1 of array) {
    for (let n2 of arrayCopy) {
      if ((number + n1 + n2) === 2020) {
        console.log({number, n1, n2})
        console.log(`number x n2 x n2 = ${number*n1*n2}`)
      }
    }
  }
}

array = [...data]
while (array.length > 1) {
  const number = array.pop()
  sum2020_2(number, array)
}

console.log("done for today")