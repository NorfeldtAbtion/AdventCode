import data from './puzzle.js'

console.log('https://adventofcode.com/2020/day/5\n')

function getLocation(boardingPassPart, incrementChar) {
  let location = 0
  for (let [index, char] of [...boardingPassPart].entries()) {
    const incrementor = Math.floor((2**(boardingPassPart.length-1)) / (2 ** index))
    location += char == incrementChar ? incrementor : 0
  }
  return location
}

function getBoardingPassInfo(boardingPass) {
  const row = getLocation(boardingPass.substring(0,7), 'B')
  const column = getLocation(boardingPass.substring(7), 'R')
  return {row, column, seatId: row*8+column}
}

const specs = [
  'FBFBBFFRLR',
  'BFFFBBFRRR',
  'FFFBBBFRRR',
  'BBFFBBFRLL',
]

const specAssertions = [
  {row: 44, column: 5, seatId: 357},
  {row: 70, column: 7, seatId: 567},
  {row: 14, column: 7, seatId: 119},
  {row: 102, column: 4, seatId: 820},
]


specs.forEach((spec, index) => {
  const result = JSON.stringify(getBoardingPassInfo(spec))
  const assertion = JSON.stringify(specAssertions[index])
  console.assert( result == assertion, `result: ${result} assertion: ${assertion}\n`)
})


let answer = data.reduce((acc, value) => {
  const { seatId } = getBoardingPassInfo(value)
  return seatId > acc ? seatId : acc
}, 0)

console.log(answer)

////////////////////
console.log('https://adventofcode.com/2020/day/5#part2\n')

const seatIds = data.reduce((acc, value) => {
  const { seatId } = getBoardingPassInfo(value)
  return [...acc, seatId]
}, []).sort()

answer = Object.entries(seatIds).reduce((acc, [index, seatId]) => {
  const i = parseInt(index)
  // console.log({index, seatId})
  const nextSeatId = seatIds[i + 1]
  const nextnextSeatId = seatIds[i + 2]
  if (nextSeatId == seatId + 2 && nextnextSeatId == seatId + 3) {
    return seatId+1
  }
  return acc
}, 0)

console.log(answer)