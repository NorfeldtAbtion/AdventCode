import data from './puzzle.js'

const spec = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

let assertion = 5

function gameConsole(commands) {
  const commandIndecies = []
  let commandIndex = 0
  let acc = 0

  while (!commandIndecies.includes(commandIndex) || commandIndecies.length == commands.length) {
    commandIndecies.push(commandIndex)
    // console.log({ commandIndex })
    const commandline = commands[commandIndex]
    // console.log({ commandline })
    const [cmd, signAndNumber] = commandline.split(' ')
    const sign = signAndNumber.charAt(0)
    const number = parseInt(signAndNumber.slice(1))
    // console.log({ cmd, sign, number })
    switch (cmd) {
      case 'jmp':
        commandIndex = sign == '+' ? commandIndex + number : commandIndex - number
        break
      case 'acc':
        acc = sign == '+' ? acc + number : acc - number
      case 'nop':
      default:
        commandIndex += 1
    }
  }

  console.log({ steps: commandIndecies.length })

  return acc
}

let result = gameConsole(spec.split('\n'))

console.assert(result == assertion, `result: "${result}" assertion: ${assertion}}`)

const answerPart1 = gameConsole(data.split('\n'))
console.log({ answerPart1 })
console.log()

function gameConsoleFixed(commands) {
  let fixed = false
  const commandsToSwich = []

  const gameConsole = (commands, collectCommandsToSwitch = false) => {
    const commandIndecies = []
    let commandIndex = 0
    let acc = 0
    while (!commandIndecies.includes(commandIndex)) {
      commandIndecies.push(commandIndex)
      // console.log({ commandIndex })
      const commandline = commands[commandIndex]
      if (commandline == undefined) {
        break
      }
      const [cmd, signAndNumber] = commandline.split(' ')
      const sign = signAndNumber.charAt(0)
      const number = parseInt(signAndNumber.slice(1))
      // console.log({ cmd, sign, number })

      switch (cmd) {
        case 'jmp':
          if (collectCommandsToSwitch) {
            commandsToSwich.push([commandIndex, commandline.replace('jmp', 'nop')])
          }
          commandIndex = sign == '+' ? commandIndex + number : commandIndex - number
          break
        case 'acc':
          acc = sign == '+' ? acc + number : acc - number
        case 'nop':
          if (collectCommandsToSwitch && cmd == 'nop') {
            commandsToSwich.push([commandIndex, commandline.replace('nop', 'jmp')])
          }
        default:
          commandIndex += 1
      }

      if (commandIndex == commands.length) {
        fixed = true
      }
    }
    // console.log({ steps: commandIndecies.length, collectCommandsToSwitch })

    return acc
  }

  gameConsole(commands, true)

  console.log(`commandsToSwich: ${commandsToSwich.length}`)
  console.log()
  // let counter = 0
  let accFixed
  while (!fixed) {
    // counter += 1
    // console.log(counter)

    const fixedCommands = [...commands]
    const [indexFix, commandLineFix] = commandsToSwich.pop()
    // console.log({ indexFix, commandLine: commands[indexFix] })
    // console.log({ indexFix, commandLineFix })
    fixedCommands[indexFix] = commandLineFix

    accFixed = gameConsole(fixedCommands)
  }

  return accFixed
}

const answerPart2 = gameConsoleFixed(data.split('\n'))
console.log({ answerPart2 })
