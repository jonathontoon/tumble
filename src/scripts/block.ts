import Sprite from "./sprite";

class Block extends Sprite {
	constructor(x: number, y: number, size: number) {
		super(x, y, size, "#FFFF00");
	};
};

export default Block;