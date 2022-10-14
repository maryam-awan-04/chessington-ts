import Board from '../board'
import { Piece } from './piece'
import Square from '../square'

export class King extends Piece {
  constructor(player: symbol) {
    super(player)
  }

  getAvailableMoves(board: Board): Square[] {
    const currentSquare = board.findPiece(this)

    const north = Square.at (
      currentSquare.row + 1,
      currentSquare.col,
    )

    const northEast = Square.at (
      currentSquare.row + 1,
      currentSquare.col + 1,
    )

    const east = Square.at (
      currentSquare.row,
      currentSquare.col + 1,
    )

    const southEast = Square.at (
      currentSquare.row - 1,
      currentSquare.col + 1,
    )

    const south = Square.at (
      currentSquare.row - 1,
      currentSquare.col,
    )

    const southWest = Square.at (
      currentSquare.row - 1,
      currentSquare.col - 1,
    )

    const west = Square.at (
      currentSquare.row,
      currentSquare.col - 1,
    )

    const northWest = Square.at (
      currentSquare.row + 1,
      currentSquare.col - 1,
    )

    return [north, northEast, east, southEast, south, southWest, west, northWest]
  }
}
