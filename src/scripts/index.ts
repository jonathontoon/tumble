interface Tile {
	row: number;
	column: number;
	color: string;
	marked: boolean;
};

interface Coordinates {
	x: number;
	y: number;
};

(function (): void {

	const tileSize: number = 64;
	const numberOfTiles: number = 9;
	const tileColors: string[] = ["red", "green", "blue", "purple", "orange"];
	
	const canvasElement: HTMLCanvasElement = document.getElementById("viewport") as HTMLCanvasElement;
	const canvasContext: CanvasRenderingContext2D = canvasElement.getContext("2d") as CanvasRenderingContext2D;

	let tileBoard: Tile[][];

	// function isNotMarked(row: number, column: number): boolean {
	// 	return tileBoard[row][column].marked;
	// };

	// function matchesType(row: number, column: number, color: string): boolean {
	// 	return tileBoard[row][column].color === color;
	// };

	function findMatchesForTile(row: number, column: number, color: string): number {
		if (tileBoard[row][column].color === "black" 
			|| tileBoard[row][column].marked
			|| tileBoard[row][column].color !== color) {
			return 0;
		}

		tileBoard[row][column].marked = true;
		
		let matches = 1;
		if (row > 0) {
			matches += findMatchesForTile(row - 1, column, color);
		}
		if (row < numberOfTiles - 1) {
			matches += findMatchesForTile(row + 1, column, color);
		}
		if (column > 0) {
			matches += findMatchesForTile(row, column - 1, color);
		}
		if (column < numberOfTiles - 1) {
			matches += findMatchesForTile(row, column + 1, color);
		}

		return matches;
	};

	function clearTile(row: number, column: number, color: string): void {
		if (findMatchesForTile(row, column, color) < 2) {
			tileBoard[row][column].marked = false;
			return;
		}
	};
	
	function dropMarkedBlocks(): void {
		for (let col = 0; col < numberOfTiles; col++) {
			for (let row = numberOfTiles - 1; row >= 0; row--) {
				if (tileBoard[row][col].marked) {
					for (let colrow = row; colrow >= 0; colrow--) {
						if (colrow > 0) {
							tileBoard[colrow][col].color = tileBoard[colrow - 1][col].color;
							tileBoard[colrow][col].marked = tileBoard[colrow - 1][col].marked;
						} else {
							tileBoard[colrow][col].color = "black";
							tileBoard[colrow][col].marked = false;
						}
					}
					row++;
				}
			}
		}
	}
	
	function shiftClearedRows(): void {
		for (let col = 0; col < numberOfTiles; col++) {
			while (tileBoard[numberOfTiles - 1][col].color === "black") {
				for (let shiftcol = col; shiftcol < numberOfTiles - 1; shiftcol++) {
					for (let row = 0; row < numberOfTiles; row++) {
						tileBoard[row][shiftcol].color = tileBoard[row][shiftcol + 1].color;
						tileBoard[row][shiftcol].marked = tileBoard[row][shiftcol + 1].marked;
					}
				}
				
				for (let row = 0; row < numberOfTiles; row++) {
					tileBoard[row][numberOfTiles - 1].color = "black";
					tileBoard[row][numberOfTiles - 1].marked = false;
				}
				
				let allblack = true;
				for (let examcol = numberOfTiles - 1; examcol > col; examcol--) {
					if (tileBoard[numberOfTiles - 1][examcol].color !== "black") {
						allblack = false;
					}
				}
				
				if (allblack) {
					break;
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
					marked: false
				};
			}
		}

		return board;
	};

	function renderBoard(): void {
		canvasContext.clearRect(0, 0, tileSize * tileSize, tileSize * tileSize);

		for (let i = 0; i < numberOfTiles; i++) {
			for (let j = 0; j < numberOfTiles; j++) {
				canvasContext.beginPath();
				canvasContext.fillStyle = tileBoard[i][j].color;
				canvasContext.rect(tileBoard[i][j].column * tileSize, tileBoard[i][j].row * tileSize, tileSize, tileSize);
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

		clearTile(row, column, tileBoard[row][column].color);
		dropMarkedBlocks();
		shiftClearedRows();
	};

	document.addEventListener("DOMContentLoaded", (handleDOMContentLoaded), false);
	window.requestAnimationFrame(handleRequestAnimationFrame);
	canvasElement.addEventListener("click", handleOnClick, false);

})();