
import data from './puzzle.js'


console.log('https://adventofcode.com/2019/day/3')
const spec = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

function goRightdown(input, right = 3, down = 1) {
  const forestPattern = input.split('\n')
  const nTrees = Object.entries(forestPattern).reduce((acc, [index, value]) => {
    const i = parseInt(index)
    if (i % down > 0) {
      return acc
    }
    const nRepeat = Math.ceil(((i + 1) / down))
    const rightIndex = Math.floor(i / down) * right
    const spot = value.repeat(nRepeat)[rightIndex]
    if (spot === '#') {
      acc += 1
    }
    
    return acc
  }, 0)

  return nTrees
}

console.log('Example:')
console.log(spec.split('\n'))
console.log(`In this example, traversing the map using this slope would cause you to encounter 7 trees`)
console.assert(goRightdown(spec) == 7, `encounter 7 trees but encountered ${goRightdown(spec)}`)

console.log(goRightdown(data))


/////////////////////
console.log('https://adventofcode.com/2019/day/3/part2')

console.log(`In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336`)

function productOfOptions(input) {
  return goRightdown(input, 1, 1 ) * goRightdown(input, 3, 1 ) * goRightdown(input, 5, 1 ) * goRightdown(input, 7, 1 ) * goRightdown(input, 1, 2 )
}
console.assert(productOfOptions(spec) == 336, `product: ${productOfOptions(spec)}`)

productOfOptions(spec)

console.log(productOfOptions(data))