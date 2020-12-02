import moduleWeights from './data.js'

// Part 1
console.log("https://adventofcode.com/2019/day/1#part1")

const totalFuel = moduleWeights.reduce((acc, moduleWeight) => {
  const moduleFuelConsumption = Math.floor(moduleWeight / 3) - 2;
  acc = acc + moduleFuelConsumption;
  return acc;
}, 0);

console.log({totalFuel});

// part 2
console.log("https://adventofcode.com/2019/day/1#part2")
const fuelConsumption = (weight) => {
  return Math.floor(weight / 3) - 2;
};

const totalFuelWithAllWeight = moduleWeights.reduce((acc, moduleWeight) => {
  let fuel = 0;
  let weightLeft = fuelConsumption(moduleWeight);
  console.log({moduleWeight, fuel, weightLeft})
  while (true) {
    fuel = fuel + weightLeft;
    weightLeft = fuelConsumption(weightLeft);
    if (weightLeft <= 0) {
      break
    }
    console.log({moduleWeight, fuel, weightLeft})
  }
  acc = acc + fuel;
  return acc;
}, 0);

console.log({totalFuelWithAllWeight});
