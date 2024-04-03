# Given Challenge
## State Server!

Vistar serves up a mound of geospatial data both internally and to third
parties. What we need is a server to tell us which state, if any, a point is in.
Some simplified geometries are included in states.json (so greatly simplified,
that some of the smaller ones disappear).

It need not be fast, but the code should be readable, and the results should be
correct.

We would prefer a server that accepts GET requests like the one listed in the
expected behavior, but we will also accept a solution that accepts the
latitude/longitude via command line params.

### Expected Behavior

  If going the server route:

  $ ./state-server &
  [1] 21507
  $ curl  -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/
  ["Pennsylvania"]
  $

  If going the command line route, it should accept two arguments the first of
  which is the latitude and the second being the longitude:

  $ ./state-server 40.51379 -77.036133
  Pennsylvania
  $

### Notes

Given that file, it took one of us about an hour to implement something that
worked correctly. You're welcome to take it however far you want, but we're
expecting something along those lines.

And if there's anything special we have to do to run your program, just let us
know. A Makefile never hurt anyone.

We would prefer that your solution not require a specific IDE to run, and that
it can be built and run on the command line.

# Solution

## Tech Notes

- We will use Bun and TypeScript
- Bun's testing module for testing, with Supertest for server testing

## Implementation Notes
- `states.json` isn't really a valid JSON file, so I fixed it up
  - Every entry is wrapped up in a states object
  - All the entries are put in an array
- Checking points in states
  - Basically checking if a point is in a polygon
  - Can assume polygon is convex, since its a state (borders would be weird otherwise)
  - Can use even-odd-rule algorithm to find the result
  - In production, would use something like https://github.com/Turfjs/turf
  - No point can be in 2 states at once
- Server
  - Use the http module
  - Instead of a GET request (which isn't supposed to include data), we use a POST request
- Tests
  - Use the Bun testing module for more speed
  - Need to check edge cases
  - 100% test coverage
  - Supertest for server testing

## Usage
### Dependencies
- The main dependency is [Bun](https://bun.sh).
```bash
npm install -g bun # mac/linux
powershell -c "irm bun.sh/install.ps1|iex" # windows
```

### Server
```bash
bun run server.js &
curl -d "longitude=-77.036133&latitude=40.51379" http://localhost:3000/
# Pennsylvania
```

### Testing
```bash
bun test
bun test --coverage
# See test coverage
```
