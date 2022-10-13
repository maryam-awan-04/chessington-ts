import Board from '../board'
import Player from '../player'
import Square from '../square'
import { Queen } from './queen'

describe('Queen', () => {
  let board: Board
  beforeEach(() => (board = new Board()))

  it('can move laterally', () => {
    const queen = new Queen(Player.WHITE)
    board.setPiece(Square.at(2, 3), queen)

    const moves = queen.getAvailableMoves(board)

    const expectedMoves = [
      // Horizontal
      Square.at(2, 0),
      Square.at(2, 1),
      Square.at(2, 2),
      Square.at(2, 4),
      Square.at(2, 5),
      Square.at(2, 6),
      Square.at(2, 7),
      // Vertical
      Square.at(0, 3),
      Square.at(1, 3),
      Square.at(3, 3),
      Square.at(4, 3),
      Square.at(5, 3),
      Square.at(6, 3),
      Square.at(7, 3),
    ]

    expect(moves).toEqual(expect.arrayContaining(expectedMoves))
  })

  it('can move diagonally', () => {
    const queen = new Queen(Player.WHITE)
    board.setPiece(Square.at(2, 3), queen)

    const moves = queen.getAvailableMoves(board)

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
    const queen = new Queen(Player.WHITE)
    board.setPiece(Square.at(2, 3), queen)

    const moves = queen.getAvailableMoves(board)

    expect(moves).toHaveLength(25)
  })
})
