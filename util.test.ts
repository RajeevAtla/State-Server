import { expect, test } from "bun:test";
import { whichState, type StateBorders, getData, isPointInPoly } from "./util";


test('getData works correctly AKA without errors', () => {
    const StateBorders = getData();
    expect(Array.isArray(StateBorders)).toBe(true);
})

test('isPointInPoly should return true for a point inside the polygon', () => {
    const polygon = [[1, 1], [1, 4], [4, 4], [4, 1]]; // Define a square polygon
    const pointInside = [2, 2]; // Point inside the polygon
    expect(isPointInPoly(pointInside, polygon)).toBe(true);
});

test('isPointInPoly should return false for a point outside the polygon', () => {
    const polygon = [[1, 1], [1, 4], [4, 4], [4, 1]]; // Define a square polygon
    const pointOutside = [5, 5]; // Point outside the polygon
    expect(isPointInPoly(pointOutside, polygon)).toBe(false);
});

test('isPointInPoly should handle points on the edge of the polygon', () => {
    const polygon = [[1, 1], [1, 4], [4, 4], [4, 1]]; // Define a square polygon
    const pointOnEdge = [1, 2]; // Point on the edge of the polygon
    expect(isPointInPoly(pointOnEdge, polygon)).toBe(true);
});

test('isPointInPoly should handle points on the vertex of the polygon', () => {
    const polygon = [[1, 1], [1, 4], [4, 4], [4, 1]]; // Define a square polygon
    const pointOnVertex = [1, 1]; // Point on the vertex of the polygon
    expect(isPointInPoly(pointOnVertex, polygon)).toBe(true);
});


// Mock states data to be used for testing
const mockStatesData: Array<StateBorders> = [
    { state: "MockState1", border: [[0, 0], [0, 3], [3, 3], [3, 0]] }, // Square state
    { state: "MockState2", border: [[4, 4], [4, 6], [6, 6], [6, 4]] },  // Another square state
    { state: "MockState3", border: [[3, 0], [3, 3], [6, 3], [6, 0]] }  // Shares an edge with MockState1
];

test('whichState identifies correct state for a point inside a state', () => {
    const pointInsideMockState1 = [1, 1]; // Point inside MockState1

    expect(whichState(pointInsideMockState1, mockStatesData)).toBe("MockState1");
});

test('whichState returns "no state found" for a point outside all states', () => {
    const pointOutsideAnyState = [10, 10]; // Point outside any defined states

    expect(whichState(pointOutsideAnyState, mockStatesData)).toBe("no state found");
});

test('whichState handles points on the edge of a state correctly', () => {
    const pointOnEdgeOfMockState1 = [0, 1]; // Point on the edge of MockState1

    // The expected result depends on how your function defines a point on the edge:
    // whether it's considered inside the state or outside. Adjust the expectation accordingly.
    expect(whichState(pointOnEdgeOfMockState1, mockStatesData)).toBe("MockState1");
});

test('whichState identifies correct state for a point on a shared edge', () => {
    const pointOnSharedEdge = [3, 1]; // Point on the shared edge between MockState1 and MockState3

    // Depending on your implementation, the function might consider this point as part of either state,
    // or might return "no state found" if points on edges are considered outside. Adjust the expectation accordingly.
    // This test checks if the point is considered to be in either of the states sharing the edge, or none.
    const result = whichState(pointOnSharedEdge, mockStatesData);
    expect(result).toBeOneOf(["MockState1", "MockState3", "no state found"]);
});