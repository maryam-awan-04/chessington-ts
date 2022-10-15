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

    for (let j = 0; j < availableMoves.length; j++) {
      if (board.getPiece(availableMoves[j])) {
        availableMoves.pop()
      }
    }
    for (let j = 0; j < northEastMoves.length; j++) {
      if (board.getPiece(northEastMoves[j])) {
        northEastMoves.pop()
      }
    }
    for (let j = 0; j < southEastMoves.length; j++) {
      if (board.getPiece(southEastMoves[j])) {
        southEastMoves.pop()
      }
    }
    for (let j = 0; j < southWestMoves.length; j++) {
      if (board.getPiece(southWestMoves[j])) {
        southWestMoves.pop()
      }
    }
    for (let j = 0; j < northWestMoves.length; j++) {
      if (board.getPiece(northWestMoves[j])) {
        northWestMoves.pop()
      }
    }

    const allAvailableMoves = [...availableMoves, ...northEastMoves, ...southEastMoves, ...southWestMoves, ...northWestMoves]

    return allAvailableMoves
  }
}
