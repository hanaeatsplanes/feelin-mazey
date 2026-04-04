import { findNeighborsTrim } from "@/mazes/utils.ts";

export default function (width: number, height: number) {
	const size = width * height;
	const nbrs = findNeighborsTrim(width, height);
	const visited = new Set<number>();
	const edges: [number, number][] = [];

	const start = Math.floor(Math.random() * size);
	visited.add(start);

	let frontier: [number, number][] = [];
	for (const n of nbrs.get(start)!) {
		frontier.push([start, n]);
	}

	while (frontier.length > 0) {
		const idx = Math.floor(Math.random() * frontier.length);
		const wall = frontier[idx];
		const [, cell] = wall;

		if (!visited.has(cell)) {
			visited.add(cell);
			edges.push(wall);

			for (const n of nbrs.get(cell)!) {
				if (!visited.has(n)) {
					frontier.push([cell, n]);
				}
			}
		}

		frontier.splice(idx, 1);
	}

	return edges;
}
