/**
 * Performs an even-odd rule algorithm in O(n) time and O(1) space
 * n is the number of edges in the polygon
 * if the number of times a ray from the point crosses an edge is odd,
 * then the point is in the polygon, and vice versa
 * @param {Array<Array<number>>} polygon as a 2D array
 * @param {Array<number>} point as an array
 * @return {boolean} return whether or not point is in polygon
 */

function isPointInPoly(pt: Array<number>, poly: Array<Array<number>>): boolean {
    let odd: boolean = false;  

    for(let i: number = 0, j: number = poly.length - 1; i < poly.length; i++) {
        if (((poly[i][1] > pt[1]) !== (poly[j][1] > pt[1])) // one point needs to be above, one below our y coordinate
            // ... and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
            && (pt[0] < ((poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]))) {
            // flip odd
            odd = !odd;
        }
        j = i;
    }

    return odd;
}

module.exports = {isPointInPoly};