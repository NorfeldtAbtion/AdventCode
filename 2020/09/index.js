import 'lodash.permutations'
import _ from 'lodash'
import puzzle from './puzzle.js'

const data = puzzle.split('\n').map((str) => parseInt(str))

const spec = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
  .split('\n')
  .map((str) => parseInt(str))

function xmasWeaknessFinder(sequence, preambleLength) {
  let numbers = [...sequence]
  let weakNumber

  while (typeof weakNumber == 'undefined') {
    let nextNumber = numbers[preambleLength]
    const preamble = _.uniq([...numbers].splice(0, preambleLength))
    const permutations = _.permutations(preamble, 2)
    // the next number must be the sum of two of those numbers
    const possibleSums = permutations.reduce((acc, [n1, n2]) => [...acc, n1 + n2], [])

    if (!possibleSums.includes(nextNumber)) {
      weakNumber = nextNumber
      continue
    }
    numbers.shift()
    nextNumber = numbers[preambleLength]
  }

  numbers = [...sequence]
  let encryptionWeakness

  while (typeof encryptionWeakness == 'undefined') {
    let firstContiguousNumber = numbers.shift()
    const contiguousSet = [firstContiguousNumber]
    let sum = firstContiguousNumber
    for (let lastContiguousNumber of numbers) {
      sum += lastContiguousNumber
      contiguousSet.push(lastContiguousNumber)

      if (sum == weakNumber) {
        encryptionWeakness = Math.max(...contiguousSet) + Math.min(...contiguousSet)
        break
      }
      if (sum > weakNumber) {
        break
      }
    }
  }

  return [weakNumber, encryptionWeakness]
}

let specAssertion = [127, 62]
let result = xmasWeaknessFinder(spec, 5)
console.assert(
  result.toString() == specAssertion.toString(),
  `result: ${result}; assertion: ${specAssertion}`
)

const answerPart1 = xmasWeaknessFinder(data, 25)[0]
console.log({ answerPart1 })

const answerPart2 = xmasWeaknessFinder(data, 25)[1]
console.log({ answerPart2 })
