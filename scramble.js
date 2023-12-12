const faces = ['R', 'L', 'U', 'D', 'F', 'B']
const directions = {
  '3x3x3': ['', "'", '2'],
  '4x4x4': ['', "'", '2', 'w', "w'", 'w2'],
  '5x5x5': ['', "'", '2', 'w', "w'", 'w2'],
  '6x6x6': ['', "'", '2', 'w', "w'", 'w2', '3w', "3w'", '3w2'],
  '7x7x7': ['', "'", '2', 'w', "w'", 'w2', '3w', "3w'", '3w2'],
}
const maxMoves = {
  '3x3x3': 25,
  '4x4x4': 40,
  '5x5x5': 60,
  '6x6x6': 85,
  '7x7x7': 95,
}

function generateMoves(type = '3x3x3', excludeFace = '') {
  const moves = []

  for (const face of faces.filter((face) => face !== excludeFace)) {
    for (const direction of directions[type]) {
      moves.push(face + direction)
    }
  }

  return moves
}

function getRandomMove(type = '3x3x3', excludeFace = '') {
  const moves = generateMoves(type, excludeFace)
  const randomIndex = Math.floor(Math.random() * moves.length)
  return moves[randomIndex]
}

function generateScramble(type = '3x3x3', numMoves = maxMoves[type]) {
  if (!maxMoves[type]) throw new Error('Invalid cube type')

  let scramble = []
  let lastMove = ''

  for (let i = 0; i < numMoves; i++) {
    const excludeFace = scramble.length > 2 ? scramble[i - 2].charAt(0) : ''

    let newMove = getRandomMove(type, excludeFace)

    // Ensure the new move is not in the same direction as the last move
    while (newMove.charAt(0) === lastMove.charAt(0)) {
      newMove = getRandomMove(type, excludeFace)
    }

    lastMove = newMove
    scramble.push(newMove)
  }

  return scramble
}

console.log('3x3x3 Scramble: ' + generateScramble('3x3x3').join(' '))
console.log('4x4x4 Scramble: ' + generateScramble('4x4x4').join(' '))
console.log('5x5x5 Scramble: ' + generateScramble('5x5x5').join(' '))
console.log('6x6x6 Scramble: ' + generateScramble('6x6x6').join(' '))
console.log('7x7x7 Scramble: ' + generateScramble('7x7x7').join(' '))
