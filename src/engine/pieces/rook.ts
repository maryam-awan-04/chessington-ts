import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Rook extends Piece {
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

    return availableMoves
  }
}
