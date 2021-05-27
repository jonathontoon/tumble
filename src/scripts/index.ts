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
		return row >= 0 && row < tileBoard.length && column >= 0 && column < tileBoard[row].length;
	};

	function fill(row: number, column: number, color: string): void {
		const checkedTiles: Tile[] = [];
		let tile: Tile = tileBoard[row][column];

		function flow(row: number, column: number, color: string): void {
			if (withinBounds(row, column)) {
				tile = tileBoard[row][column];

				if (!checkedTiles.includes(tile)) {
					if (tile.color === color) {
						tile.visible = false;
						tile.color = "lightgray";
	
						checkedTiles.push(tile);
						flow(row-1, column, color);    // check up
						flow(row+1, column, color);    // check down
						flow(row, column-1, color);    // check left
						flow(row, column+1, color);    // check right
					}
				}
			}
		};

		flow(row, column, color);

		if (checkedTiles.length === 1) {
			tile = checkedTiles[0];
			tile.visible = true;
		}
	};
	
	function compressRows(): void {
		//Fall down
		for (let column = 0; column < numberOfTiles; column++) {
			for (let row = numberOfTiles - 1; row >= 0; row--) {
				if (!tileBoard[row][column].visible) {
					for (let currentRow = row; currentRow >= 0; currentRow--) {
						if (currentRow != 0) {
							tileBoard[currentRow][column] = tileBoard[currentRow - 1][column];
						}
					}
	
					row++;
				}
			}
		}
	};

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
				canvasContext.beginPath();
				canvasContext.fillStyle = tile.color;
				canvasContext.rect(tile.column * tileSize, tile.row * tileSize, tileSize, tileSize);
				canvasContext.fill();
				canvasContext.closePath();
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
		console.log(tileBoard);
	};

	function handleRequestAnimationFrame(): void {
		renderBoard();
		window.requestAnimationFrame(handleRequestAnimationFrame);
	};

	function handleOnClick(event: MouseEvent): void {
		const mousePosition = getMousePosition(canvasElement, event);
		const row = Math.floor(mousePosition.y / tileSize);
		const column = Math.floor(mousePosition.x / tileSize);

		fill(row, column, tileBoard[row][column].color);
		compressRows();
	};

	document.addEventListener("DOMContentLoaded", (handleDOMContentLoaded), false);
	window.requestAnimationFrame(handleRequestAnimationFrame);
	canvasElement.addEventListener("click", handleOnClick, false);

})();