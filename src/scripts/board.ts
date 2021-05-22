import Sprite from "./sprite";

class Board {
	private tileSize: number;
	private numberOfTiles: number;
	private colors: string[];

	private tiles: Sprite[][];

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
			this.tiles[tile.row][tile.column].isEmpty = true;
		});
	};

	private getConnectedTiles(initialRow: number, initialColumn: number): Sprite[] {
		const initialTile: Sprite = this.tiles[initialRow][initialColumn];
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
				tilesToCheck.push(this.tiles[tile.row][tile.column + 1]);
			}

			if (this.withinBounds(tile.row, tile.column - 1)) {
				tilesToCheck.push(this.tiles[tile.row][tile.column - 1]);
			}

			if (this.withinBounds(tile.row + 1, tile.column)) {
				tilesToCheck.push(this.tiles[tile.row + 1][tile.column]);
			}

			if (this.withinBounds(tile.row - 1, tile.column)) {
				tilesToCheck.push(this.tiles[tile.row - 1][tile.column]);
			}
		}

		return connectedtiles;
	};

	public render(context: CanvasRenderingContext2D): void {
		this.tiles.forEach((column) => {
			column.forEach((tiles) => {
				tiles.render(context);
			});
		});
	};
};

export default Board;