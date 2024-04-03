import { which } from "bun";
import data from "./states.json";
import {
	type StateBorders,
	getData,
	isPointInPoly,
	whichState,
} from "./util.ts";

const jsonData = data.states;
const StateBordersData: Array<StateBorders> = [];

jsonData.forEach((element) =>
	StateBordersData.push({ state: element.state, border: element.border }),
);

const testLong = -77.036133;
const testLat = 40.51379;

const testPt: Array<number> = [testLong, testLat];

//let penn: StateBorders = StateBordersData.find((state) => state.state == "Pennsylvania");

console.log(whichState(testPt, StateBordersData));
