import Board from '../board'
import Player from '../player'
import Square from '../square'
import { Bishop } from './bishop'
import { Pawn } from './pawn'

describe('Bishop', () => {
  let board: Board
  beforeEach(() => (board = new Board()))

  it('can move diagonally', () => {
    const bishop = new Bishop(Player.WHITE)
    board.setPiece(Square.at(2, 3), bishop)

    const moves = bishop.getAvailableMoves(board)

    const expectedMoves = [
      // Forwards diagonal
      Square.at(0, 1),
      Square.at(1, 2),
      Square.at(3, 4),
      Square.at(4, 5),
      Square.at(5, 6),
      Square.at(6, 7),
      // Backwards diagonal
      Square.at(0, 5),
      Square.at(1, 4),
      Square.at(3, 2),
      Square.at(4, 1),
      Square.at(5, 0),
    ]

    expect(moves).toEqual(expect.arrayContaining(expectedMoves))
  })

  it('cannot make any other moves', () => {
    const bishop = new Bishop(Player.WHITE)
    board.setPiece(Square.at(2, 3), bishop)

    const moves = bishop.getAvailableMoves(board)

    expect(moves).toHaveLength(11)
  })

  it('cannot move through friendly pieces', () => {
    const bishop = new Bishop(Player.WHITE)
    const friendlyPiece = new Pawn(Player.WHITE)
    board.setPiece(Square.at(4, 4), bishop)
    board.setPiece(Square.at(6, 6), friendlyPiece)

    const moves = bishop.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(7, 7))
  })

  it('cannot move through opposing pieces', () => {
    const bishop = new Bishop(Player.WHITE)
    const opposingPiece = new Pawn(Player.BLACK)
    board.setPiece(Square.at(4, 4), bishop)
    board.setPiece(Square.at(6, 6), opposingPiece)

    const moves = bishop.getAvailableMoves(board)

    expect(moves).not.toContainEqual(Square.at(7, 7))
  })
})
