import { which } from 'bun';
import data from './states.json';
import {isPointInPoly, whichState, getData, type StateBorders} from './util.ts'


let jsonData = data.states;
let StateBordersData: Array<StateBorders> = [];

jsonData.forEach((element) => StateBordersData.push({state: element.state, border: element.border}));

let testLong: number = -77.036133;
let testLat: number = 40.51379;

let testPt: Array<number> = [testLong, testLat];

//let penn: StateBorders = StateBordersData.find((state) => state.state == "Pennsylvania");

console.log(whichState(testPt, StateBordersData));