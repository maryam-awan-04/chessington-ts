import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(board: Board): Square[] {
    const currentSquare = board.findPiece(this)

    const nextSquare = Square.at (
      currentSquare.row + (this.player === Player.WHITE ? 1  : -1),
      currentSquare.col
    )
    const nextNextSquare = Square.at (
      currentSquare.row + (this.player === Player.WHITE ? 2  : -2),
      currentSquare.col
    )
    const isFirstMove = currentSquare.row === 1 && this.player === Player.WHITE
      || currentSquare.row === 6 && this.player === Player.BLACK

    if (isFirstMove) {
      return [nextSquare, nextNextSquare]
    }

    return [nextSquare]
  }
}
