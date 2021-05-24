interface Tile {
	row: number;
	column: number;
	color: string;
	visible: boolean;
};

interface Coordinates {
	x: number;
	y: number;
};

(function (): void {

	const tileSize: number = 64;
	const numberOfTiles: number = 9;
	const tileColors: string[] = ["red", "green", "blue", "orange", "purple"];
	
	const canvasElement: HTMLCanvasElement = document.getElementById("viewport") as HTMLCanvasElement;
	const canvasContext: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;

	let tileBoard: Tile[][];

	// function isNotMarked(row: number, column: number): boolean {
	// 	return tileBoard[row][column].marked;
	// };

	// function matchesType(row: number, column: number, color: string): boolean {
	// 	return tileBoard[row][column].color === color;
	// };

	function withinBounds(row: number, column: number): boolean {
		return row >= 0 && row < numberOfTiles && column >= 0 && column < numberOfTiles;
	};

	function tilesToMatch(row: number, column: number, color: string): void {
		const tilesChecked: Tile[] = [];
		const tilesToCheck: Tile[] = [];
		tilesToCheck.push(tileBoard[row][column]);

		while (tilesToCheck.length > 0) {
			const tile: Tile | undefined = tileBoard[row][column];

			if (tile && (tile.color !== color || !tile.visible || tilesChecked.includes(tile))) {
				continue;
			}

			tile.visible = false;

			tilesChecked.push(tile);

			tilesToCheck.push(tileBoard[row - 1][column]);
			tilesToCheck.push(tileBoard[row][column + 1]);
			tilesToCheck.push(tileBoard[row + 1][column]);
			tilesToCheck.push(tileBoard[row][column - 1]);
		};
	};
	
	function compressRows(): void {
		let currentRow: number;
		
		for (let column: number = 0; column < numberOfTiles; column++) {
			for (let row: number = numberOfTiles - 1; row >= 0; row--) {
				if (!tileBoard[row][column].visible) {
					currentRow = row - 1;

					while(currentRow >= 0) {
						if (tileBoard[currentRow][column].visible) {
							tileBoard[row][column].row = tileBoard[currentRow][column].row;
							tileBoard[row][column].column = tileBoard[currentRow][column].column;
							tileBoard[row][column].color = tileBoard[currentRow][column].color;

							currentRow = 0;
						}
						currentRow--;
					}
				}
			}
		}
	}
	
	function compressColumns(): void {
		let currentColumn: number;

		for(let column: number = 0; column < numberOfTiles; column++) {
			if (!tileBoard[numberOfTiles - 1][column].visible) {
				currentColumn = column + 1;
 
				while (currentColumn < numberOfTiles) {
					if (tileBoard[numberOfTiles - 1][currentColumn].visible) {
						for (let row: number = 0; row < numberOfTiles; row++) {
							if(tileBoard[row][currentColumn].visible) {
								tileBoard[row][column].row = tileBoard[row][currentColumn].row;
								tileBoard[row][column].column = tileBoard[row][currentColumn].column;
								tileBoard[row][column].color = tileBoard[row][currentColumn].color;
							}
						}
		
						currentColumn = numberOfTiles;
					}
		
					currentColumn++;
				}
			}
		}
	}

	function generateBoard(): Tile[][] {
		const board: Tile[][] = [];

		for (let i = 0; i < numberOfTiles; i++) {
			board[i] = [];
			for (let j = 0; j < numberOfTiles; j++) {
				board[i][j] = {
					row: i,
					column: j,
					color: tileColors[Math.floor(Math.random() * tileColors.length)],
					visible: true
				};
			}
		}

		return board;
	};

	function renderBoard(): void {
		canvasContext.clearRect(0, 0, tileSize * tileSize, tileSize * tileSize);

		for (let i = 0; i < numberOfTiles; i++) {
			for (let j = 0; j < numberOfTiles; j++) {
				const tile: Tile = tileBoard[i][j];
				if (tile.visible) {
					canvasContext.beginPath();
					canvasContext.fillStyle = tile.color;
					canvasContext.rect(tile.row * tileSize, tile.column * tileSize, tileSize, tileSize);
					canvasContext.fill();
					canvasContext.closePath();
				}
			}
		}
	};

	// function getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent): Coordinates {
	// 	const rect: DOMRect = canvas.getBoundingClientRect();
	// 	return {
	// 		x: e.clientX - rect.left,
	// 		y: e.clientY - rect.top
	// 	};
	// }

	function handleDOMContentLoaded(): void {
		tileBoard = generateBoard();
		tilesToMatch(5, 5, tileBoard[5][5].color);
		console.log(tileBoard);
	};

	function handleRequestAnimationFrame(): void {
		renderBoard();
		window.requestAnimationFrame(handleRequestAnimationFrame);
	};

	// function handleOnClick(event: MouseEvent): void {
	// 	const mousePosition = getMousePosition(canvasElement, event);
	// 	const row = Math.floor(mousePosition.x / tileSize);
	// 	const column = Math.floor(mousePosition.y / tileSize);

	// 	// tilesToMatch(row, column, tileBoard[row][column].color);
	// 	// compressRows();
	// 	// compressColumns();
	// };

	document.addEventListener("DOMContentLoaded", (handleDOMContentLoaded), false);
	window.requestAnimationFrame(handleRequestAnimationFrame);
	// canvasElement.addEventListener("click", handleOnClick, false);

})();