import data from './puzzleInput.js'


console.log('https://adventofcode.com/2020/day/2')
const specs = [
  ['1-3', 'a', 'abcde'],
  ['1-3', 'b', 'cdefg'],
  ['2-9', 'c', 'ccccccccc']
]

let specAssertions = [true, false, true]

function isValidPassword([limits, character, password]) {
  const [lowerLimit, upperLimit] = limits.split('-')
  const occurances = ` ${password} `.split(character).length - 1
  if (occurances >= lowerLimit && occurances <= upperLimit) {
    return true
  }
  
  return false
}

specs.forEach((spec, index) => {
  console.log(`"${spec}" is ${specAssertions[index] ? 'valid' : 'invalid'}`)
  console.assert(isValidPassword(spec) === specAssertions[index])
})

console.log(data.filter(record => isValidPassword(record)).length)

////////////////
console.log('https://adventofcode.com/2020/day/2#part2')

specAssertions = [true, false, false]

function isValidPassword_new_rules([limits, character, password]) {
  const [firstPosition, secondPosition] = limits.split('-')
  const occuranceAtFirstPosition = password[firstPosition-1] == character ? 1 : 0
  const occuranceAtSecondPosition = password[secondPosition - 1] == character ? 1 : 0
  
  if ((occuranceAtFirstPosition + occuranceAtSecondPosition) == 1) {
    return true
  }
  
  return false
}

specs.forEach((spec, index) => {
  console.log(`"${spec}" is ${specAssertions[index] ? 'valid' : 'invalid'}`)
  console.assert(isValidPassword_new_rules(spec) === specAssertions[index])
})

console.log(data.filter(record => isValidPassword_new_rules(record)).length)