import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Queen extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(board: Board): Square[] {
    const currentSquare = board.findPiece(this)

    const availableMoves = []

    for (let i = 0; i <= 7; i++) {
      if (i === currentSquare.row) {continue}
      const nextSquareVertical = Square.at (
        i,
        currentSquare.col
      )
      availableMoves.push(nextSquareVertical)
    }
    for (let j = 0; j <= 7; j++) {
      if (j === currentSquare.col) {continue}
      const nextSquareHorizontal = Square.at (
        currentSquare.row,
        j
      )
      availableMoves.push(nextSquareHorizontal)
    }

    const northEastMoves = []

    const minNE = Math.min(7-currentSquare.row, 7-currentSquare.col)
    const minSE = Math.min(currentSquare.row, 7-currentSquare.col)
    const minSW = Math.min(currentSquare.row, currentSquare.col)
    const minNW = Math.min(7-currentSquare.row, currentSquare.col)

    for (let i = 1; i <= minNE; i++) {
      const nextSquare = Square.at (
        currentSquare.row + i,
        currentSquare.col + i,
      )
      northEastMoves.push(nextSquare)
    }

    const southEastMoves = []

    for (let i = 1; i <= minSE; i++) {
      const nextSquare = Square.at (
        currentSquare.row - i,
        currentSquare.col + i,
      )
      southEastMoves.push(nextSquare)
    }

    const southWestMoves = []

    for (let i = 1; i <= minSW; i++) {
      const nextSquare = Square.at (
        currentSquare.row - i,
        currentSquare.col - i,
      )
      southWestMoves.push(nextSquare)
    }

    const northWestMoves = []

    for (let i = 1; i <= minNW; i++) {
      const nextSquare = Square.at (
        currentSquare.row + i,
        currentSquare.col - i,
      )
      northWestMoves.push(nextSquare)
    }

    const allAvailableMoves = [...availableMoves, ...northEastMoves, ...southEastMoves, ...southWestMoves, ...northWestMoves]

    return allAvailableMoves
  }
}
