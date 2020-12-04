import data from './puzzle.js'

console.log('https://adventofcode.com/2020/day/4')
const spec = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`

let specAssertions = [true, false, true, false]

function getPassports(input) {
  const lines = input.replace(/(\n)(\w)/g, ' $2').replace(/\n\s/gm, '\n')
  return lines.split('\n')
}

console.log(getPassports(spec))

function isValidPassport(passport, optionalFields = [], validations=true) {
  const fields = passport.split(' ')
  const requiredFields = ['byr' , 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']
  const requiredFieldsWithoutOptional = requiredFields.filter(field => !optionalFields.includes(field))

  for (let field of requiredFieldsWithoutOptional) {
    const regex = `\\b${field}:`
    if (!passport.match(regex)) {
      return false
    }
  }

  if (validations) {
    for (let field of fields) {
      const [fieldType, fieldValue] = field.split(':')
      if (!requiredFieldsWithoutOptional.includes(fieldType)) {
        continue
      }
      if (!isValidField(field)) {
        return false
      }
    }
  }

  return true

}

function isInRange(value, min, max) {
  if (value < min || value > max) {
    return false
  }
  return true
}

function isValidField(field) {
  const [fieldType, fieldValue] = field.split(':')
  
  switch (fieldType) {
    case 'byr':
      if (!fieldValue.match(/^[0-9]{4}$/) ) return false
      return isInRange(fieldValue, 1920, 2002)
    case 'iyr':
      if (!fieldValue.match(/^[0-9]{4}$/) ) return false
      return isInRange(fieldValue, 2010, 2020)
    case 'eyr':
      if (!fieldValue.match(/^[0-9]{4}$/) ) return false
      return isInRange(fieldValue, 2020, 2030)
    case 'hgt':
      const found = fieldValue.match(/(.*)(in|cm)$/)
      if (!found) return false
      const [_str, number, unit] = found
      if (!unit) {
        return false
      }
      if (unit === 'cm') {
        return isInRange(number,150,193) 
      }
      if (unit === 'in') {
        return isInRange(number, 59, 76)
      }
    case 'hcl':
      return fieldValue.match(/^#[0-9a-f]{6}$/) ? true : false
    case 'ecl':
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(fieldValue)
    case 'pid':
      return fieldValue.match(/^[0-9]{9}$/) ? true : false
    case 'cid':
      return true
    default:
      console.log({fieldType, fieldValue})
      console.log("you should not see me")
      console.log()
      return false
  }
}


getPassports(spec).forEach((passportSpec, index) => {
  // console.log(`${passportSpec} is found to be ${isValidPassport(passportSpec, ['cid']) ? "valid" : "invalid"}`)
  const assertion = isValidPassport(passportSpec, ['cid']) == specAssertions[index]
  console.assert(assertion, `"${passportSpec}" should be ${specAssertions[index]}`)
})


const part1validPassports = getPassports(data).filter((passportSpec, index) => {
  return isValidPassport(passportSpec, ['cid'], false)
})

console.log(part1validPassports.length)

////////// PART 2
console.log('https://adventofcode.com/2020/day/4/part2')

console.assert(isValidField("byr:2002") == true, `byr:2002 should be true`)

console.assert(isValidField("byr:2003") == false, `byr:2003 should be false`)

console.assert(isValidField("hgt:60in") == true, `hgt:60in should be true`)
console.assert(isValidField("hgt:190cm") == true, `hgt:190cm should be true`)
console.assert(isValidField("hgt:190in") == false, `hgt:190in should be false`)
console.assert(isValidField("hgt:190") == false, `hgt:190 should be false`)

console.assert(isValidField("hcl:#123abc") == true, `hcl:#123abc should be true`)
console.assert(isValidField("hcl:#123abz") == false, `hcl:#123abz should be false`)
console.assert(isValidField("hcl:123abc") == false, `hcl:123abc should be false`)

console.assert(isValidField("ecl:brn") == true, `ecl:brn should be true`)
console.assert(isValidField("ecl:wat") == false, `ecl:wat should be false`)

console.assert(isValidField("pid:000000001") == true, `pid:000000001 should be true`)
console.assert(isValidField("pid:0123456789") == false, `pid:0123456789 should be false`)

const specInvalidPassports = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`

getPassports(specInvalidPassports).forEach((passportSpec, index) => {
  const assertion = isValidPassport(passportSpec, ['cid']) == false
  console.assert(assertion, `"${passportSpec}" should be false`)
})

const specValidPassports = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`

getPassports(specValidPassports).forEach((passportSpec, index) => {
  const assertion = isValidPassport(passportSpec, ['cid']) == true
  console.assert(assertion, `"${passportSpec}" should be true`)
})

const part2validPassports = getPassports(data).filter((passportSpec, index) => {
  return isValidPassport(passportSpec, ['cid'], true)
})
console.log(part2validPassports.length)