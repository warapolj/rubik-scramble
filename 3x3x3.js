const faces = ['R', 'L', 'U', 'D', 'F', 'B']
const directions = ['', "'", '2']

function generateMoves(excludeFace = '') {
  const moves = []

  for (const face of faces.filter((face) => face !== excludeFace)) {
    for (const direction of directions) {
      moves.push(face + direction)
    }
  }

  return moves
}

function getRandomMove(excludeFace = '') {
  const moves = generateMoves(excludeFace)
  const randomIndex = Math.floor(Math.random() * moves.length)
  return moves[randomIndex]
}

function generateScramble(numMoves = 25) {
  let scramble = []
  let lastMove = ''

  for (let i = 0; i < numMoves; i++) {
    const excludeFace = scramble.length > 2 ? scramble[i - 2].charAt(0) : ''

    let newMove = getRandomMove(excludeFace)

    // Ensure the new move is not in the same direction as the last move
    while (newMove.charAt(0) === lastMove.charAt(0)) {
      newMove = getRandomMove(excludeFace)
    }

    lastMove = newMove
    scramble.push(newMove)
  }

  return scramble
}

console.log('3x3x3 Scramble: ' + generateScramble(25).join(' '))
