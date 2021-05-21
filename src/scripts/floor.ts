import Sprite from "./sprite";

class Floor extends Sprite {
	constructor(x: number, y: number, size: number) {
		super(x, y, size, "#FF0000");
	};
};

export default Floor;