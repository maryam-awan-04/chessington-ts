const Player = Object.freeze({
    WHITE: Symbol('white'),
    BLACK: Symbol('black'),
});

const GameSettings = Object.freeze({
    BOARD_SIZE: 8,
});

class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
    static at(row, col) {
        return new Square(row, col);
    }
    equals(otherSquare) {
        return (!!otherSquare &&
            this.row === otherSquare.row &&
            this.col === otherSquare.col);
    }
    toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }
}

class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer || Player.WHITE;
        this.board = this.createBoard();
    }
    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }
    getPiece(square) {
        return this.board[square.row][square.col];
    }
    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }
    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer =
                this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE;
        }
    }
}

class Piece {
    constructor(player) {
        this.player = player;
    }
    getAvailableMoves(_board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }
    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}

class Bishop extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const northEastMoves = [];
        const minNE = Math.min(7 - currentSquare.row, 7 - currentSquare.col);
        const minSE = Math.min(currentSquare.row, 7 - currentSquare.col);
        const minSW = Math.min(currentSquare.row, currentSquare.col);
        const minNW = Math.min(7 - currentSquare.row, currentSquare.col);
        for (let i = 1; i <= minNE; i++) {
            const nextSquare = Square.at(currentSquare.row + i, currentSquare.col + i);
            northEastMoves.push(nextSquare);
        }
        const southEastMoves = [];
        for (let i = 1; i <= minSE; i++) {
            const nextSquare = Square.at(currentSquare.row - i, currentSquare.col + i);
            southEastMoves.push(nextSquare);
        }
        const southWestMoves = [];
        for (let i = 1; i <= minSW; i++) {
            const nextSquare = Square.at(currentSquare.row - i, currentSquare.col - i);
            southWestMoves.push(nextSquare);
        }
        const northWestMoves = [];
        for (let i = 1; i <= minNW; i++) {
            const nextSquare = Square.at(currentSquare.row + i, currentSquare.col - i);
            northWestMoves.push(nextSquare);
        }
        const allAvailableMoves = [...northEastMoves, ...southEastMoves, ...southWestMoves, ...northWestMoves];
        return allAvailableMoves;
    }
}

class King extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(_board) {
        return [];
    }
}

class Knight extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const branch1 = Square.at(currentSquare.row + 2, currentSquare.col + 1);
        const branch2 = Square.at(currentSquare.row + 1, currentSquare.col + 2);
        const branch3 = Square.at(currentSquare.row - 1, currentSquare.col + 2);
        const branch4 = Square.at(currentSquare.row - 2, currentSquare.col + 1);
        const branch5 = Square.at(currentSquare.row - 2, currentSquare.col - 1);
        const branch6 = Square.at(currentSquare.row - 1, currentSquare.col - 2);
        const branch7 = Square.at(currentSquare.row + 1, currentSquare.col - 2);
        const branch8 = Square.at(currentSquare.row + 2, currentSquare.col - 1);
        return [branch1, branch2, branch3, branch4, branch5, branch6, branch7, branch8];
    }
}

class Pawn extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const nextSquare = Square.at(currentSquare.row + (this.player === Player.WHITE ? 1 : -1), currentSquare.col);
        const nextNextSquare = Square.at(currentSquare.row + (this.player === Player.WHITE ? 2 : -2), currentSquare.col);
        const isFirstMove = currentSquare.row === 1 && this.player === Player.WHITE
            || currentSquare.row === 6 && this.player === Player.BLACK;
        if (isFirstMove) {
            return [nextSquare, nextNextSquare];
        }
        return [nextSquare];
    }
}

class Queen extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const availableMoves = [];
        for (let i = 0; i <= 7; i++) {
            if (i === currentSquare.row) {
                continue;
            }
            const nextSquareVertical = Square.at(i, currentSquare.col);
            availableMoves.push(nextSquareVertical);
        }
        for (let j = 0; j <= 7; j++) {
            if (j === currentSquare.col) {
                continue;
            }
            const nextSquareHorizontal = Square.at(currentSquare.row, j);
            availableMoves.push(nextSquareHorizontal);
        }
        const northEastMoves = [];
        const minNE = Math.min(7 - currentSquare.row, 7 - currentSquare.col);
        const minSE = Math.min(currentSquare.row, 7 - currentSquare.col);
        const minSW = Math.min(currentSquare.row, currentSquare.col);
        const minNW = Math.min(7 - currentSquare.row, currentSquare.col);
        for (let i = 1; i <= minNE; i++) {
            const nextSquare = Square.at(currentSquare.row + i, currentSquare.col + i);
            northEastMoves.push(nextSquare);
        }
        const southEastMoves = [];
        for (let i = 1; i <= minSE; i++) {
            const nextSquare = Square.at(currentSquare.row - i, currentSquare.col + i);
            southEastMoves.push(nextSquare);
        }
        const southWestMoves = [];
        for (let i = 1; i <= minSW; i++) {
            const nextSquare = Square.at(currentSquare.row - i, currentSquare.col - i);
            southWestMoves.push(nextSquare);
        }
        const northWestMoves = [];
        for (let i = 1; i <= minNW; i++) {
            const nextSquare = Square.at(currentSquare.row + i, currentSquare.col - i);
            northWestMoves.push(nextSquare);
        }
        const allAvailableMoves = [...availableMoves, ...northEastMoves, ...southEastMoves, ...southWestMoves, ...northWestMoves];
        return allAvailableMoves;
    }
}

class Rook extends Piece {
    constructor(player) {
        super(player);
    }
    getAvailableMoves(board) {
        const currentSquare = board.findPiece(this);
        const availableMoves = [];
        for (let i = 0; i <= 7; i++) {
            if (i === currentSquare.row) {
                continue;
            }
            const nextSquareVertical = Square.at(i, currentSquare.col);
            availableMoves.push(nextSquareVertical);
        }
        for (let j = 0; j <= 7; j++) {
            if (j === currentSquare.col) {
                continue;
            }
            const nextSquareHorizontal = Square.at(currentSquare.row, j);
            availableMoves.push(nextSquareHorizontal);
        }
        return availableMoves;
    }
}

let board;
function squareToPositionString(square) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return letters[square.col] + (square.row + 1).toString();
}
function positionStringToSquare(positionString) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return Square.at(parseInt(positionString.charAt(1), 10) - 1, letters.indexOf(positionString.charAt(0)));
}
function pieceToPieceString(piece) {
    const playerString = piece.player === Player.WHITE ? 'w' : 'b';
    if (piece instanceof Pawn) {
        return playerString + 'P';
    }
    else if (piece instanceof Rook) {
        return playerString + 'R';
    }
    else if (piece instanceof Knight) {
        return playerString + 'N';
    }
    else if (piece instanceof Bishop) {
        return playerString + 'B';
    }
    else if (piece instanceof Queen) {
        return playerString + 'Q';
    }
    else if (piece instanceof King) {
        return playerString + 'K';
    }
}
function boardToPositionObject() {
    let position = {};
    for (let row = 0; row < GameSettings.BOARD_SIZE; row++) {
        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            const square = Square.at(row, col);
            const piece = board.getPiece(square);
            if (!!piece) {
                position[squareToPositionString(square)] =
                    pieceToPieceString(piece);
            }
        }
    }
    return position;
}
function onDragStart(_source, piece, _position, _orientation) {
    return ((board.currentPlayer === Player.WHITE && piece.search(/^w/) !== -1) ||
        (board.currentPlayer === Player.BLACK && piece.search(/^b/) !== -1));
}
function onDrop(source, target) {
    const fromSquare = positionStringToSquare(source);
    const toSquare = positionStringToSquare(target);
    const pieceToMove = board.getPiece(fromSquare);
    if (!pieceToMove ||
        !pieceToMove
            .getAvailableMoves(board)
            .some((square) => square.equals(toSquare))) {
        return 'snapback';
    }
    pieceToMove.moveTo(board, toSquare);
    updateStatus();
}
function updateStatus() {
    const player = board.currentPlayer === Player.WHITE ? 'White' : 'Black';
    document.getElementById('turn-status').innerHTML = `${player} to move`;
}
function boardInStartingPosition() {
    let board = new Board();
    for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
        board.setPiece(Square.at(1, i), new Pawn(Player.WHITE));
        board.setPiece(Square.at(6, i), new Pawn(Player.BLACK));
    }
    for (let i of [0, 7]) {
        board.setPiece(Square.at(0, i), new Rook(Player.WHITE));
        board.setPiece(Square.at(7, i), new Rook(Player.BLACK));
    }
    for (let i of [1, 6]) {
        board.setPiece(Square.at(0, i), new Knight(Player.WHITE));
        board.setPiece(Square.at(7, i), new Knight(Player.BLACK));
    }
    for (let i of [2, 5]) {
        board.setPiece(Square.at(0, i), new Bishop(Player.WHITE));
        board.setPiece(Square.at(7, i), new Bishop(Player.BLACK));
    }
    board.setPiece(Square.at(0, 3), new Queen(Player.WHITE));
    board.setPiece(Square.at(7, 3), new Queen(Player.BLACK));
    board.setPiece(Square.at(0, 4), new King(Player.WHITE));
    board.setPiece(Square.at(7, 4), new King(Player.BLACK));
    return board;
}
const ChessBoard = window['Chessboard'];
function createChessBoard() {
    board = boardInStartingPosition();
    ChessBoard('chess-board', {
        showNotation: false,
        draggable: true,
        position: boardToPositionObject(),
        onDragStart: onDragStart,
        onDrop: onDrop,
    });
    updateStatus();
}
window.addEventListener('load', createChessBoard);

export { createChessBoard };
