import data from './puzzle.js'

console.log(`https://adventofcode.com/2020/day/6`)
function log(str) {
  process.stdout.write(`${str}; `)
}

function countYesInGroups(groups) {
  return groups.reduce((acc, answers) => {
    const oneLineAnswers = answers.replace(/\n+/g, '')
    const uniqueSet = new Set(oneLineAnswers)
    const yesCount = [...uniqueSet].length
    acc += yesCount
    return acc
  }, 0)
}


const spec = `abc

a
b
c

ab
ac

a
a
a
a

b`

const assertion = 11
const result = countYesInGroups(spec.split('\n\n'))
console.assert(result == assertion, `result: "${result}" assertion: ${assertion}}`)

const groups = data.split('\n\n')
let answer = countYesInGroups(groups)
console.log(answer)

///////////////
console.log(`https://adventofcode.com/2020/day/6/part2`)

function countEveryOneYesInGroup(group) {
  const PersonAnswer = group.split('\n')
  const questions = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  let count = 0
  for (let question of questions) {
    count += PersonAnswer.every( answer => answer.includes(question)) ? 1 : 0
  }
  return count
}


const assertions = [3, 0, 1, 1, 1]
spec.split('\n\n').forEach((group, index) => {
  const result = countEveryOneYesInGroup(group)
  console.assert(result == assertions[index], `result: "${result}" assertion: ${assertions[index]}}`)
})

answer = groups.reduce((acc, group) => (acc + countEveryOneYesInGroup(group)), 0)
console.log(answer)