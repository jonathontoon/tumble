import Tile from "./tile";
import { Direction, Rotate } from "./enums";

class Game {

	private rowLength: number;
	private columnLength: number;
	
	private tileSize: number;
	private tileColors: string[];

	private tileBoard: Tile[][];
	private tilePool: Tile[];
	private filledTiles: Tile[];

	constructor(tileSize: number, gridSize: number) {
		this.rowLength = gridSize;
		this.columnLength = gridSize;

		this.tileSize = tileSize;
		this.tileColors = ["red", "green", "blue", "orange", "purple"];

		this.tileBoard = [];
		this.tilePool = [];
		this.filledTiles = [];

		this.createBoard();
	};

	private createBoard(): void {
		for (let row = 0; row < this.rowLength; row++){
			this.tileBoard[row] = [];
			for (let column = 0; column < this.columnLength; column++){
				this.tileBoard[row].push(this.addTile(row, column));
			}
		}
	};

	private addTile(row: number, column: number): Tile {
		const color: string = this.tileColors[Math.floor(Math.random() * this.tileColors.length)];
		return new Tile(column, row, this.tileSize, color); 
	};

	private floodFill(row: number, column: number, color: string): void {
		if (column < 0 || row < 0 || column >= this.columnLength || row >= this.rowLength){
			return;
		}

		if (this.tileBoard[row][column].isEmpty) {
			return;
		}

		if (this.tileBoard[row][column].color !== color) {
			return;
		}

		this.tileBoard[row][column].isEmpty = true;
		this.filledTiles.push(this.tileBoard[row][column]);
		
		this.floodFill(row + 1, column, color);
		this.floodFill(row - 1, column, color); 
		this.floodFill(row, column + 1, color);
		this.floodFill(row, column - 1, color);
	};

	public moveSelection(direction: Direction): void {
		console.log(direction);
	};

	public clearTile(): void {
		console.log("Clear");
	};

	public rotateBoard(direction: Rotate): void {
		console.log(direction);
	};

	public render(context: CanvasRenderingContext2D): void {
		for (let row = 0; row < this.rowLength; row++){
			for (let column = 0; column < this.columnLength; column++){
				this.tileBoard[row][column].render(context);
			}
		}
	};
};

export default Game;