import Tile from "./tile";
import Selection from "./selection";

import { Direction, Rotate, Sprite } from "./enums";

class Game {

	private rowLength: number;
	private columnLength: number;
	
	private tileSize: number;
	private tileSprites: Sprite[];

	private tileBoard: Tile[][];
	private filledTiles: Tile[];

	private selection: Selection;

	constructor(tileSize: number, gridSize: number) {
		this.rowLength = gridSize;
		this.columnLength = gridSize;

		this.tileSize = tileSize;
		this.tileSprites = [Sprite.Orange, Sprite.Blue, Sprite.Green, Sprite.Purple, Sprite.Red];

		this.tileBoard = [];
		this.filledTiles = [];

		this.selection = new Selection(0, 0, this.tileSize);

		this.createBoard();
	};

	private createBoard(): void {
		let counter: number = 0;
		for (let row = 0; row < this.rowLength; row++) {
			this.tileBoard[row] = [];
			for (let column = 0; column < this.columnLength; column++) {
				const sprite: Sprite = this.tileSprites[Math.floor(Math.random() * this.tileSprites.length)];
				const tile: Tile = new Tile(counter, column, row, this.tileSize, sprite); 
				this.tileBoard[row].push(tile);
				counter++;
			}
		}
	};

	private tilesInColumn(column: number): number {
		let result = 0;
		for (let i = 0; i < this.rowLength; i++) {
			if (!this.tileBoard[i][column].empty){
				result++;
			}
		}
		return result;
	};

	private swapTiles(fromRow: number, fromCol: number, toRow: number, toCol: number): void {
		const swappingFrom: Tile = this.tileBoard[fromRow][fromCol];
		const swappingTo: Tile = this.tileBoard[toRow][toCol];

		swappingFrom.id = swappingTo.id;
		swappingFrom.x = toCol;
		swappingFrom.y = toRow;
		
		swappingTo.empty = true;
		swappingTo.id = swappingFrom.id;
		
		this.tileBoard[toRow][toCol] = swappingFrom;
		this.tileBoard[fromRow][fromCol] = swappingTo;
	};

	private fillVerticalGaps(): void {
		for (let i = this.rowLength - 2; i >= 0; i--){
			for (let j = 0; j < this.columnLength; j++){
				if (this.tileBoard[i][j] !== null){
					let holesBelow = 0;
					for (let z = i + 1; z < this.rowLength; z++){
						if (this.tileBoard[z][j].empty){
							holesBelow++;
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
							if (!this.tileBoard[z][j].empty) {
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
		for (let i = 0; i < this.filledTiles.length; i++) {
			this.tileBoard[this.filledTiles[i].y][this.filledTiles[i].x].empty = true;
		}
	};

	private floodFill(row: number, column: number, sprite: Sprite): void {
		if (column < 0 || row < 0 || column >= this.columnLength || row >= this.rowLength){
			return;
		}

		const tile: Tile = this.tileBoard[row][column];

		if (tile.empty || tile.sprite !== sprite || this.filledTiles.includes(tile)) {
			return;
		}

		this.filledTiles.push(tile);
		
		this.floodFill(row + 1, column, sprite);
		this.floodFill(row - 1, column, sprite); 
		this.floodFill(row, column + 1, sprite);
		this.floodFill(row, column - 1, sprite);
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

		const currentTile: Tile = this.tileBoard[this.selection.y][this.selection.x];
		this.floodFill(currentTile.y, currentTile.x, currentTile.sprite);

		if (this.filledTiles.length > 1) {
			this.destroyTiles();
			this.fillVerticalGaps();
			this.fillHorizontalGaps();
		}

		console.log(this.tileBoard);
	};

	public rotateBoard(direction: Rotate): void {
		const selectedTile: Tile = this.tileBoard[this.selection.y][this.selection.x];
		console.log(selectedTile.sprite);
		const destination: Tile[][] = [];
		
		for (let i = 0; i < this.rowLength; i++) {
			destination[i] = [];
		}

		// start copying from source into destination
		for (let row = 0; row < this.rowLength; row++) {
			for (let column = 0; column < this.columnLength; column++) {
				if (direction === Rotate.Clockwise) {
					destination[row][column] = this.tileBoard[this.columnLength - column - 1][row];
				} else if (direction === Rotate.CounterClockwise) {
					destination[row][column] = this.tileBoard[column][this.rowLength - row - 1];
				}
			}
		}

		// return the destination matrix
		this.tileBoard = destination;

		for (let row = 0; row < this.rowLength; row++) {
			for (let column = 0; column < this.columnLength; column++) {
				const currentTitle: Tile = this.tileBoard[row][column];
				if (currentTitle) {
					if (currentTitle.x === this.selection.x && currentTitle.y === this.selection.y) {
						this.selection.x = column;
						this.selection.y = row;
					}

					currentTitle.x = column;
					currentTitle.y = row;
				}
				this.tileBoard[row][column] = currentTitle;
			}
		}

		this.fillVerticalGaps();
		this.fillHorizontalGaps();

		for (let row = 0; row < this.rowLength; row++) {
			for (let column = 0; column < this.columnLength; column++) {
				const currentTitle: Tile = this.tileBoard[row][column];
				if (currentTitle.id === selectedTile.id) {
					this.selection.x = currentTitle.x;
					this.selection.y = currentTitle.y;
				}
			}
		}
	};

	public render(context: CanvasRenderingContext2D, now: number): void {
		for (let row = 0; row < this.rowLength; row++) {
			for (let column = 0; column < this.columnLength; column++) {
				const currentTile: Tile = this.tileBoard[row][column];
				if (!currentTile.empty) {
					currentTile.render(context);
				}
			}
		}

		this.selection.render(context, now);
	};
};

export default Game;