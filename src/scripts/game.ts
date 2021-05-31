import Tile from "./tile";
import Selection from "./selection";

import { Color, Direction, Rotate } from "./enums";

class Game {

	private rowLength: number;
	private columnLength: number;
	
	private tileSize: number;
	private tileColors: string[];

	private tileBoard: (Tile | null)[][];
	private filledTiles: Tile[];

	private selection: Selection;

	constructor(tileSize: number, gridSize: number) {
		this.rowLength = gridSize;
		this.columnLength = gridSize;

		this.tileSize = tileSize;
		this.tileColors = [Color.Red, Color.Blue, Color.Green, Color.Orange, Color.Purple];

		this.tileBoard = [];
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

	private tilesInColumn(column: number): number {
		let result = 0;
		for (let i = 0; i < this.rowLength; i++) {
			if (this.tileBoard[i][column] !== null){
				result++;
			}
		}
		return result;
	};

	private swapTiles(fromRow: number, fromCol: number, toRow: number, toCol: number): void {
		this.tileBoard[toRow][toCol] = this.tileBoard[fromRow][fromCol];

		const tile: Tile | null = this.tileBoard[toRow][toCol];
		if (tile !== null) {
			tile.x = toCol;
			tile.y = toRow;
		}
		
		this.tileBoard[toRow][toCol] = tile;
		this.tileBoard[fromRow][fromCol] = null;
	};

	private fillVerticalGaps(): void {
		for (let i = this.rowLength - 2; i >= 0; i--){
			for (let j = 0; j < this.columnLength; j++){
				if (this.tileBoard[i][j] !== null){
					let holesBelow = 0;
					for (let z = i + 1; z < this.rowLength; z++){
						if (this.tileBoard[z][j] === null){
							holesBelow ++;
						}    
					}
					if (holesBelow){  
						this.swapTiles(i, j, i + holesBelow, j);                                                                
					}
				}     
			}
		}
	};

	private fillHorizontalGaps(): void {
		for (let i = 0; i < this.columnLength - 1; i++){
			if (this.tilesInColumn(i) === 0){
				for (let j = i + 1; j < this.columnLength; j++){
					if (this.tilesInColumn(j) !== 0){
						for (let z = 0; z < this.rowLength; z++){
							if (this.tileBoard[z][j] !== null){
								this.swapTiles(z, j, z, i);
							}    
						}
						break;
					}     
				}
			}
		}
	};

	public destroyTiles(): void {
		for (let i = 0; i < this.filledTiles.length; i++){
			this.tileBoard[this.filledTiles[i].y][this.filledTiles[i].x] = null;
		}
		console.log(this.tileBoard);
	};

	private floodFill(row: number, column: number, color: string): void {
		if (column < 0 || row < 0 || column >= this.columnLength || row >= this.rowLength){
			return;
		}

		const tile: Tile | null = this.tileBoard[row][column];

		if (tile === null) {
			return;
		}

		if (tile.color !== color) {
			return;
		}

		if (this.filledTiles.includes(tile)) {
			return;
		}

		this.filledTiles.push(tile);
		
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
		this.filledTiles = [];

		const currentTile: Tile | null = this.tileBoard[this.selection.y][this.selection.x];
		if (currentTile) {
			this.floodFill(currentTile.y, currentTile.x, currentTile.color);
		}

		if (this.filledTiles.length > 1) {
			this.destroyTiles();
			this.fillVerticalGaps();
			this.fillHorizontalGaps();
		}
	};

	public rotateBoard(direction: Rotate): void {
		console.log(direction);
	};

	public render(context: CanvasRenderingContext2D): void {
		for (let row = 0; row < this.rowLength; row++){
			for (let column = 0; column < this.columnLength; column++){
				const currentTile: Tile | null = this.tileBoard[row][column];
				if (currentTile) {
					currentTile.render(context);
				}
			}
		}

		this.selection.render(context);
	};
};

export default Game;