import puzzle from './puzzle.js'


console.log('https://adventofcode.com/2020/day/7')
const spec = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

let assertion = 4

let counter = 0
let bagsToCheck = ['shiny gold']

function canContainBagOfColor(color, regulation) {
  const parentBagColor = regulation.split(' contain ')[0].split(' bag')[0]
  const containBags = regulation.split(' contain ')[1].split(/\d+[,\.\s]+/)

  for (let containBag of containBags) {
    if (containBag.includes(color) && !bagsToCheck.includes(parentBagColor)) {
      counter += 1
      bagsToCheck.push(parentBagColor)
      continue
    }
  }
}

let checkedColors = []
while (bagsToCheck.length != 0) {
  const colorToCheck = bagsToCheck.pop()
  checkedColors.push(colorToCheck)
  for (let regulation of spec.split('\n')) {
    canContainBagOfColor(colorToCheck, regulation)
  }
}

console.log([...new Set(checkedColors)].length - 1)

counter = 0
bagsToCheck = ['shiny gold']
checkedColors = []

while (bagsToCheck.length != 0) {
  const colorToCheck = bagsToCheck.pop()
  checkedColors.push(colorToCheck)
  for (let regulation of puzzle.split('\n')) {
    canContainBagOfColor(colorToCheck, regulation)
  }
}

console.log([...new Set(checkedColors)].length - 1)


////////////
console.log('https://adventofcode.com/2020/day/7#part2')

// light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.

const specPart2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`


function bagOfBags(regulations) {
  // let counter = 0
  let bagsToCheck = ['shiny gold']
  let bagsChecked = []
  let numberOfCheck = 0
  let str = ''


  let bagToCheck
  const recursive = () => {    
    // str += '( '
    bagToCheck = bagsToCheck.pop()
    bagsChecked.push(bagToCheck)
    console.log({bagsChecked})
    counter+=1
    console.log(bagToCheck)
    
    for (let regulation of regulations.split('\n')) {
      const [_firstPart, containBagsPart] = regulation.split(' contain ')
      
      if (containBagsPart == 'no other bags.') {
        // str += ' 1 )'
        return
      }
      
      const parentBagColor = regulation.split(' contain ')[0].split(' bag')[0]
      if (bagToCheck == parentBagColor) {
        const matches = containBagsPart.matchAll(/(\d)+\s(\w+\s\w+)\sbag[,\.\s]?/g)
        
        for (let match of matches) {
          const [ _, n, newColor, ...rest] = match
          str += ` ${n} `
          if (!bagsToCheck.includes(newColor) && !bagsChecked.includes(newColor)) {
            bagsToCheck.push(newColor)
            // str += ` * ( `
            recursive()
            // str += ` ) +`
          } else {
            // str += ` + `
          }
        }
        
      }
    }
    // str += ` ) +`
  }
  recursive()
  
  
  console.log(counter)
  console.log({bagsToCheck})
  console.log(str)
  return 4
}

// 1 * (1 + (3 * (1)) + (4 * (1)) + 2 * (1 + 5 + 6)

// 1 * (1 + (3 * (1)) + (4 * (1))) + 2 * (1 + 5 + 6)

// const result = 32
// assertion = bagOfBags(spec) 
// console.assert(assertion == result, `result: ${result}; assertion: ${assertion}`)
// bagOfBags(puzzle)

// function findChildBags(bagType, rules, totalBags) {
//     console.log("checking number of bags in "+ bagType);
//     let foundChildBags;
//     let foundBagLine = "";
//     let childLineTest = new RegExp("^"+bagType+" bags contain \\d.*", "gm");
//     let childTest = new RegExp("(\\d)+ (?:\\w*\\s){2}", "g");
//     let bagModifier = 0;
//     let bagsInThisBag = 0;

//     if(!childLineTest.test(rules))
//         return 0;
//     else {
//         foundBagLine = rules.match(childLineTest);
//         foundChildBags = foundBagLine.toString().match(childTest);
//         for(let i=0; i<foundChildBags.length; i++) {
//             bagType = foundChildBags[i].trim().substr(foundChildBags[i].trim().indexOf(" ")).trim();
//             bagModifier = Number(foundChildBags[i].split(" ")[0]);
//             bagsInThisBag = Number(findChildBags(bagType, rules, 0));
//             totalBags = totalBags + bagModifier + (bagModifier * bagsInThisBag);
//         }
//     }
//     return totalBags;
// }


// https://github.com/DenverCoder1/Advent-of-Code-2020---Javascript/blob/main/Day%2007/part2.js
let lines = puzzle.split("\n");

const bags = {};

// collect bags in format: { 'dim red' : [ [2, 'bright gold'], [5, 'striped fuchsia'] ] }
for (const line of lines) {
  // split bag types after outer bag type
  let innerBagTypes = line.replace(/.*?bags/, "").split(",");
  // trim to just [number, bag name]
  innerBagTypes = innerBagTypes.map(x => [Number(x.replace(/[^\d]+/g, "")), x.replace(/.*\d /, "").replace(/[^a-zA-Z ]/g, "").replace(/(bags|bag)/,"").trim()])
  // set object at outer bag type
  bags[line.replace(/bags.*/, "").trim()] = innerBagTypes;
}

// count inner bags
function countInnerBags(bags, bag) {
  // if does not contain any bags
  if (!bags[bag]) {
    return 0;
  }
  // count inner bags
  let innerBags = 0;
  for (const innerBag of bags[bag]) {
    // add innerBag[0] for number of current inner bag
    // plus innerBag[0] * the number of bags in the inner bag
    innerBags += innerBag[0] + innerBag[0] * countInnerBags(bags, innerBag[1]);
  }
  // return inner bags
  return innerBags;
}

console.log(countInnerBags(bags, "shiny gold"))