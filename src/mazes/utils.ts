export const UP: [number, number] = [0, -1];
export const DOWN: [number, number] = [0, 1];
export const LEFT: [number, number] = [-1, 0];
export const RIGHT: [number, number] = [1, 0];
export const compass = [UP, DOWN, LEFT, RIGHT];

export function indxToXy(
	width: number,
	height: number
): Map<number, [number, number]> {
	const map = new Map<number, [number, number]>();
	for (let i = 0; i < width * height; i++) {
		map.set(i, [i % width, Math.floor(i / width)]);
	}
	return map;
}

export function xyToIndx(width: number, height: number): Map<string, number> {
	const toXy = indxToXy(width, height);
	const map = new Map<string, number>();
	for (const [k, v] of toXy) {
		map.set(`${v[0]},${v[1]}`, k);
	}
	return map;
}

export function leftNeighbors(
	width: number,
	height: number
): Map<number, number | null> {
	const map = new Map<number, number | null>();
	for (let i = 0; i < width * height; i++) {
		map.set(i, i % width !== 0 ? i - 1 : null);
	}
	return map;
}

export function findNeighbors(
	width: number,
	height: number
): Map<number, (number | null)[]> {
	const toXy = indxToXy(width, height);
	const toInd = xyToIndx(width, height);
	const dct = new Map<number, (number | null)[]>();
	for (let i = 0; i < width * height; i++) {
		const xy = toXy.get(i)!;
		const arr: (number | null)[] = [null, null, null, null];
		for (let j = 0; j < compass.length; j++) {
			const dir = compass[j];
			const tx = xy[0] + dir[0];
			const ty = xy[1] + dir[1];
			if (tx >= 0 && tx < width && ty >= 0 && ty < height) {
				arr[j] = toInd.get(`${tx},${ty}`) ?? null;
			}
		}
		dct.set(i, arr);
	}
	return dct;
}

export function findNeighborsTrim(
	width: number,
	height: number
): Map<number, number[]> {
	const nbrs = findNeighbors(width, height);
	const map = new Map<number, number[]>();
	for (const [k, v] of nbrs) {
		map.set(
			k,
			v.filter((x): x is number => x !== null)
		);
	}
	return map;
}
