# State Server!

Vistar serves up a mound of geospatial data both internally and to third
parties. What we need is a server to tell us which state, if any, a point is in.
Some simplified geometries are included in states.json (so greatly simplified,
that some of the smaller ones disappear).

It need not be fast, but the code should be readable, and the results should be
correct.

We would prefer a server that accepts GET requests like the one listed in the
expected behavior, but we will also accept a solution that accepts the
latitude/longitude via command line params.

## Expected Behavior

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

## Notes

Given that file, it took one of us about an hour to implement something that
worked correctly. You're welcome to take it however far you want, but we're
expecting something along those lines.

And if there's anything special we have to do to run your program, just let us
know. A Makefile never hurt anyone.

We would prefer that your solution not require a specific IDE to run, and that
it can be built and run on the command line.
