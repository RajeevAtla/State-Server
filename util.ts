import data from "./states.json";

/**
 * Represents the borders of a state
 *
 * @interface
 * @property {string} state - the name of the state
 * @property {Array<Array<number>>} - the borders of the state
 */
export interface StateBorders {
	// suppose there are n states
	state: string;
	border: Array<Array<number>>; // n x 2 array (implemented as array of arrays)
}

/**
 * Takes the states.json file
 * Converts the entries into an array of StateBorders objects
 * @returns {Array<StateBorders>} - data thats been put into an array containing info about state borders
 */
export function getData(): Array<StateBorders> {
	const jsonData = data.states;
	const StateBordersData: Array<StateBorders> = [];

	jsonData.forEach((element) =>
		StateBordersData.push({ state: element.state, border: element.border }),
	);
	return StateBordersData;
}

/**
 * Performs an even-odd rule algorithm in O(n) time and O(1) space
 * n is the number of edges in the polygon
 * if the number of times a ray from the point crosses an edge is odd,
 * then the point is in the polygon, and vice versa
 *
 * @param {Array<Array<number>>} polygon as a 2D array
 * @param {Array<number>} point as an array
 * @return {boolean} return whether or not point is in polygon
 */
export function isPointInPoly(
	pt: Array<number>,
	poly: Array<Array<number>>,
): boolean {
	let odd = false;

	for (let i = 0, j: number = poly.length - 1; i < poly.length; i++) {
		if (
			poly[i][1] > pt[1] !== poly[j][1] > pt[1] && // one point needs to be above, one below our y coordinate
			// ... and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
			pt[0] <
				((poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1])) /
					(poly[j][1] - poly[i][1]) +
					poly[i][0]
		) {
			// basically check slope to make sure this doesn't happen
			// flip odd
			odd = !odd;
		}
		j = i;
	}

	return odd;
}

/**
 * Looks through the state border date
 * finds and returns state in which point is located
 * otherwise returns "no state found"
 *
 * @param {Array<number>} pt - point to test
 * @param {Array<StateBorders>} statesBordersData - state border data to test the point with
 * @returns {string} - state in which point is located
 */
export function whichState(
	pt: Array<number>,
	statesBordersData: Array<StateBorders>,
): string {
	//try { // use find expression to search state data
	const ans = statesBordersData.find((state) =>
		isPointInPoly(pt, state.border),
	);
	if (ans == undefined) {
		return "no state found";
	} else {
		return ans.state;
	}
	//}
	//finally { // point isnt in any state
	//return "no state found";
	//}
}
