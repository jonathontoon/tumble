import Sprite from "./sprite";

class Board {
	private tileSize: number;
	private numberOfTiles: number;
	private colors: string[];

	private tiles: (Sprite | null)[][];

	constructor(tileSize: number, numberOfTiles: number) {
		this.tileSize = tileSize;
		this.numberOfTiles = numberOfTiles;
		this.colors = ["blue", "green", "yellow", "red"];

		this.tiles = [];
		for (let i = 0; i < this.numberOfTiles; i++) {
			this.tiles[i] = [];
			for (let j = 0; j < this.numberOfTiles; j++) {
				const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
				this.tiles[i][j] = new Sprite(i, j, this.tileSize, randomColor);
			}
		}

		const t = this.getConnectedTiles(3, 5);
		if (t.length > 1) {
			this.deleteTiles(t);
		}
	};

	private withinBounds(row: number, column: number): boolean {
		return row >= 0 && row < this.numberOfTiles && column >= 0 && column < this.numberOfTiles;
	};

	private deleteTiles(tilesToDelete: Sprite[]): void {
		tilesToDelete.forEach((tile: Sprite) => {
			if (this.tiles[tile.row][tile.column] !== null) {
				this.tiles[tile.row][tile.column].isEmpty = true;
			}
		});
	};

	private shuffle(): void {
		for (let i = 0; i < this.numberOfTiles; i++) {
			let fallDistance: number = 0;
			for (let j = 0; j < this.numberOfTiles; j++) {
				if (this.tiles[i][j] === null) {
					fallDistance += 1;
				} else {
					if (fallDistance > 0) {
						const tile = this.tiles[i][j] as Sprite;
						tile.column += fallDistance * this.tileSize;

						this.tiles[i][j + fallDistance] = tile;
						this.tiles[i][j] = null;
					}
				}
			}
		}
	};

	private getConnectedTiles(initialRow: number, initialColumn: number): Sprite[] {
		const initialTile: Sprite = this.tiles[initialRow][initialColumn] as Sprite;
		const connectedtiles: Sprite[] = [];
		const tilesToCheck: Sprite[] = [];

		tilesToCheck.push(initialTile);

		while(tilesToCheck.length > 0) {
			const tile = tilesToCheck.pop() as Sprite;

			if (!this.withinBounds(tile.row, tile.column)) {
				continue;
			}

			if (tile.color !== initialTile.color) {
				continue;
			}

			if (connectedtiles.includes(tile)) {
				continue;
			}

			connectedtiles.push(tile);

			if (this.withinBounds(tile.row, tile.column + 1)) {
				tilesToCheck.push(this.tiles[tile.row][tile.column + 1] as Sprite);
			}

			if (this.withinBounds(tile.row, tile.column - 1)) {
				tilesToCheck.push(this.tiles[tile.row][tile.column - 1] as Sprite);
			}

			if (this.withinBounds(tile.row + 1, tile.column)) {
				tilesToCheck.push(this.tiles[tile.row + 1][tile.column] as Sprite);
			}

			if (this.withinBounds(tile.row - 1, tile.column)) {
				tilesToCheck.push(this.tiles[tile.row - 1][tile.column] as Sprite);
			}
		}

		return connectedtiles;
	};

	public render(context: CanvasRenderingContext2D): void {
		this.tiles.forEach((column) => {
			column.forEach((tile) => {
				if (tile) {
					tile.render(context);
				}
			});
		});
	};
};

export default Board;