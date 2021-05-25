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

	function fill(row: number, column: number, color: string): void {
		const checkedTiles: Tile[] = [];

		function flow(row: number, column: number, color: string): void {
			if (row >= 0 && row < tileBoard.length && column >= 0 && column < tileBoard[row].length) {
				if (!checkedTiles.includes(tileBoard[row][column])) {
					if (tileBoard[row][column].color === color) {
						tileBoard[row][column].visible = false;
	
						checkedTiles.push(tileBoard[row][column]);
						flow(row-1, column, color);    // check up
						flow(row+1, column, color);    // check down
						flow(row, column-1, color);    // check left
						flow(row, column+1, color);    // check right
					}
				}
			}
		};

		flow(row, column, color);

		console.log(checkedTiles.length);

		if (checkedTiles.length === 1) {
			checkedTiles[0].visible = true;
		}
	};

	function tilesToMatch(row: number, column: number, color: string): void {
		if (row < 0 || row >= numberOfTiles || column < 0 || row >= numberOfTiles) {
			return;
		}

		if (tileBoard[row][column].color !== color) {
			return;
		}

		tileBoard[row][column].visible = false;

		tilesToMatch(row - 1, column, color);
		tilesToMatch(row + 1, column, color);
		tilesToMatch(row, column - 1, color);
		tilesToMatch(row, column + 1, color);
	};
	
	function compressRows(): void {
		let currentRow: number;
		
		for (let column: number = 0; column < numberOfTiles; column++) {
			for (let row: number = numberOfTiles - 1; row >= 0; row--) {
				if (!tileBoard[column][row].visible) {
					currentRow = row - 1;

					while(currentRow >= 0) {
						if (tileBoard[column][currentRow].visible) {
							tileBoard[column][row].row = tileBoard[column][currentRow].row;
							tileBoard[column][row].column = tileBoard[column][currentRow].column;
							tileBoard[column][row].color = tileBoard[column][currentRow].color;

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
			if (!tileBoard[column][numberOfTiles - 1].visible) {
				currentColumn = column + 1;
 
				while (currentColumn < numberOfTiles) {
					if (tileBoard[currentColumn][numberOfTiles - 1].visible) {
						for (let row: number = 0; row < numberOfTiles; row++) {
							if(tileBoard[currentColumn][currentColumn].visible) {
								tileBoard[column][row].row = tileBoard[currentColumn][row].row;
								tileBoard[column][row].column = tileBoard[currentColumn][row].column;
								tileBoard[column][row].color = tileBoard[currentColumn][row].color;
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

	function getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent): Coordinates {
		const rect: DOMRect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	}

	function handleDOMContentLoaded(): void {
		tileBoard = generateBoard();
		// console.log(fill(3, 3, tileBoard[3][3].color));
		console.log(tileBoard);
		compressRows();
		compressColumns();
	};

	function handleRequestAnimationFrame(): void {
		renderBoard();
		window.requestAnimationFrame(handleRequestAnimationFrame);
	};

	function handleOnClick(event: MouseEvent): void {
		const mousePosition = getMousePosition(canvasElement, event);
		const row = Math.floor(mousePosition.x / tileSize);
		const column = Math.floor(mousePosition.y / tileSize);

		fill(row, column, tileBoard[row][column].color);
		//compressRows();
		//compressColumns();
	};

	document.addEventListener("DOMContentLoaded", (handleDOMContentLoaded), false);
	window.requestAnimationFrame(handleRequestAnimationFrame);
	canvasElement.addEventListener("click", handleOnClick, false);

})();