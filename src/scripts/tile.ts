import Sprite from "./sprite";

class Tile extends Sprite {
	constructor(x: number, y: number, size: number) {
		super(x, y, size, "#191b26");
	};
};

export default Tile;