import {findNeighborsTrim} from "@/mazes/utils/gridworld.ts";

export default function (width: number, height: number) {
    const size = width * height;
    const nbrs = findNeighborsTrim(width, height);
    const maze = Array(size).fill(0)
}