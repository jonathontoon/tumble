import Tile from "./tile";
import Selection from "./selection";

import { Direction, Rotate } from "./enums";

class Game {

	private rowLength: number;
	private columnLength: number;
	
	private tileSize: number;
	private tileColors: string[];

	private tileBoard: Tile[][];
	private tilePool: Tile[];
	private filledTiles: Tile[];

	private selection: Selection;

	constructor(tileSize: number, gridSize: number) {
		this.rowLength = gridSize;
		this.columnLength = gridSize;

		this.tileSize = tileSize;
		this.tileColors = ["red", "green", "blue", "orange", "purple"];

		this.tileBoard = [];
		this.tilePool = [];
		this.filledTiles = [];

		this.selection = new Selection(0, 0, this.tileSize, "#FFFFFF");

		this.createBoard();
	};

	private createBoard(): void {
		for (let row = 0; row < this.rowLength; row++) {
			this.tileBoard[row] = [];
			for (let column = 0; column < this.columnLength; column++) {
				const color: string = this.tileColors[Math.floor(Math.random() * this.tileColors.length)];
				const tile: Tile = new Tile(column, row, this.tileSize, color); 
				this.tileBoard[row].push(tile);
			}
		}
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

	public updateSelection(direction: Direction): void {
		if (direction === Direction.Up) {
			if (this.selection.y !== 0) {
				this.selection.move(direction);
			}
		}

		if (direction === Direction.Down) {
			if (this.selection.y !== this.rowLength - 1) {
				this.selection.move(direction);
			}
		}

		if (direction === Direction.Left) {
			if (this.selection.x !== 0) {
				this.selection.move(direction);
			}
		}

		if (direction === Direction.Right) {
			if (this.selection.x !== this.columnLength - 1) {
				this.selection.move(direction);
			}
		}
	};

	public clearTile(): void {
		const currentTile: Tile = this.tileBoard[this.selection.y][this.selection.x];
		this.floodFill(currentTile.y, currentTile.x, currentTile.color);
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

		this.selection.render(context);
	};
};

export default Game;