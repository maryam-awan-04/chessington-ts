import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Knight extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(board: Board): Square[] {
    const currentSquare = board.findPiece(this)

    const branch1 = Square.at (
      currentSquare.row + 2,
      currentSquare.col + 1,
    )

    const branch2 = Square.at (
      currentSquare.row + 1,
      currentSquare.col + 2,
    )

    const branch3 = Square.at (
      currentSquare.row - 1,
      currentSquare.col + 2,
    )

    const branch4 = Square.at (
      currentSquare.row - 2,
      currentSquare.col + 1,
    )

    const branch5 = Square.at (
      currentSquare.row - 2,
      currentSquare.col - 1,
    )

    const branch6 = Square.at (
      currentSquare.row - 1,
      currentSquare.col - 2,
    )

    const branch7 = Square.at (
      currentSquare.row + 1,
      currentSquare.col - 2,
    )

    const branch8 = Square.at (
      currentSquare.row + 2,
      currentSquare.col - 1,
    )

    return [branch1, branch2, branch3, branch4, branch5, branch6, branch7, branch8]

  }
}
