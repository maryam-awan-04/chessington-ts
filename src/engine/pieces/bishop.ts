import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class Bishop extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(board: Board) {
    const currentSquare = board.findPiece(this)

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

    const allAvailableMoves = [...northEastMoves, ...southEastMoves, ...southWestMoves, ...northWestMoves]

    return allAvailableMoves
  }
}
