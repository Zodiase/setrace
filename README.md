SetRace
=======

It's a *Barrier* for your sets of async routines.

To run a callback when all conditions are met, it's this simple:

```JavaScript
// Define the list of names for the conditions.
const conditions = [
  'downloaded_a',
  'downloaded_b',
  'timeout'
];

// Define what needs to run when all conditions are met.
const runAtTheEnd = () => {
  console.log('All conditions met!');
};

// Create the race.
const race = SETRACE(conditions, runAtTheEnd);

// Launch async tasks, one for each condition.
$.get(someUrlA, (data) => {
  // Do things with `data`.
  
  // Flag the condition as met.
  race.set['downloaded_a']();
});

$.get(someUrlB, (data) => {
  // Do things with `data`.
  
  // Flag the condition as met.
  race.set['downloaded_b']();
});

window.setTimeout(race.set['timeout'], 3000);

// Now when all three conditions are met, `runAtTheEnd` will be called.
```
