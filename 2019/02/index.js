import { validRange } from 'semver'
import data from './puzzleInput.js'

console.log('https://adventofcode.com/2019/day/2#part2')
const intCode = (array) => {
  let index = 0
  while (array[index] !== 99) {
    const firstIndex = array[index + 1]
    const secondIndex = array[index + 2]
    const thirdIndex = array[index + 3]

    switch (array[index]) {
      case 1:
        array[thirdIndex] = array[firstIndex] + array[secondIndex]
        index = index + 4
        break;

      case 2:
        array[thirdIndex] = array[firstIndex] * array[secondIndex]
        index = index + 4
        break
      case 99:
      default:
        return array;
    }
  }
  return array
}

const specs = [
  [[1, 0, 0, 0, 99], [2, 0, 0, 0, 99]],
  [[2, 3, 0, 3, 99], [2, 3, 0, 6, 99]],
  [[2, 4, 4, 5, 99, 0], [2, 4, 4, 5, 99, 9801]],
  [[1, 1, 1, 4, 99, 5, 6, 0, 99], [30, 1, 1, 4, 2, 5, 6, 0, 99]]
]

specs.forEach((spec) => {
  console.log(`${spec[0]} becomes ${spec[1]}`)
  console.assert(intCode(spec[0]).toString() === spec[1].toString(), `${spec[0]} becomes ${spec[1]}`)
})

const data1202 = [...data]

data1202[1] = 12
data1202[2] = 2

console.log(intCode(data1202)[0])

//////////////
console.log('https://adventofcode.com/2019/day/2#part2')

const range = [...Array(100).keys()]
console.log(range.slice(0,1))
console.log(range.slice(-1))

for (let noun of range) {
  for (let verb of range) {
    const array = [...data]
    array[1] = noun
    array[2] = verb
    if (intCode(array)[0] == 19690720) {
      console.log(`${100 * noun + verb}`)
    }
  }
}

