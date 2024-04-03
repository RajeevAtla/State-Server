import { createServer } from "http";
import { StringDecoder } from "string_decoder";
import { type StateBorders, getData, whichState } from "./util";

export const server = createServer((req, res) => {
	if (req.method === "POST" && req.url === "/") {
		const decoder = new StringDecoder("utf-8");
		let buffer = "";

		// Listen to the data event for the incoming POST data
		req.on("data", (data) => {
			buffer += decoder.write(data);
		});

		// End event is triggered once all the data is received
		req.on("end", () => {
			buffer += decoder.end();

			// Parse the URL-encoded data
			const params = new URLSearchParams(buffer);
			const latitude = params.get("latitude");
			const longitude = params.get("longitude");

			if (latitude && longitude) {
				// Send a response
				res.writeHead(200, { "Content-Type": "text/plain" });
				const StateBordersData: Array<StateBorders> = getData(); // get data from json file
				const pt: Array<number> = [Number(longitude), Number(latitude)]; // put pt into array
				const result: string = whichState(pt, StateBordersData); // api call to get which state
				res.end(result); // return state to client
			} else {
				// at least 1 coordinates not received
				res.writeHead(400, { "Content-Type": "text/plain" });
				res.end("Coordinates missing");
			}
		});
	} else {
		// Handle not found
		res.writeHead(404);
		res.end("Not found");
	}
});

const PORT = 3000;
if (import.meta.file == "server.ts") {
	// only start server if server.ts is run
	server.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}/`);
	});
}
