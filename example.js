var SETRACE = require(".");

require("jsdom").env("", function(err, window) {
  if (err) {
    console.error(err);
    return;
  }

  var $ = require("jquery")(window);

  // Define the list of names for the conditions.
  var conditions = [
    'downloaded_a',
    'downloaded_b',
    'timeout'
  ];

  // Define what needs to run when all conditions are met.
  var runAtTheEnd = () => {
    console.log('All conditions met!');
  };

  // Create the race.
  var race = SETRACE(conditions, runAtTheEnd);

  console.log('Race start!');

  $.get('http://i.imgur.com/y8bqp8t.png', race.set['downloaded_a']);

  $.get('http://i.imgur.com/bDp49NE.png', race.set['downloaded_b']);

  window.setTimeout(race.set['timeout'], 3000);

  // Now when all three conditions are met, `runAtTheEnd` will be called.

});
