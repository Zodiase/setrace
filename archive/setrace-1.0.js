// set race
/**
 * conditionArray: array of names of conditions that need to meet
 * callback: a function to be called when all the conditions are met
 * percentReport: a function to be called when a new condition is just met, send along with the percentage stats
 */
function SETRACE (conditionArray, callback, percentReport)
{
	return (typeof conditionArray !== 'object' || typeof callback !== 'function') ? null : new function ()
	{
		var name = (new Date()).getTime();
		var conditions = [];
		var maxCount = 0;
		var countDown = 0;
		var cb = callback;
		var pr = (typeof percentReport !== 'function') ? null : percentReport;
		this.set = [];
		function checkCountDown ()
		{
			if (countDown <= 0) {
			//	console.log('SETRACE[' + name + ']firing');
				cb.call();
			}
		}
		function _generate_setCallback (key)
		{
			return function ()
			{
			//	console.log('SETRACE[' + name + ']setting ' + key);
				if (conditions[key] === false) {
					conditions[key] = true;
					--countDown;
				//	console.log('SETRACE[' + name + '](' + countDown + '/' + maxCount + ')');
					if (pr !== null) {
						var percentResult = 1 - countDown / maxCount;
					//	console.log('SETRACE[' + name + ']reporting ' + percentResult);
						pr.call(this, percentResult);
					}
				}
				checkCountDown ();
			};
		}
		for (var i = 0; i < conditionArray.length; ++i) {
			var key = conditionArray[i];
		//	console.log('SETRACE<<' + i + ': ' + key);
			if (typeof key === 'undefined' || typeof conditions[key] !== 'undefined')
				continue;
			conditions[key] = false;
			this.set[key] = _generate_setCallback(key);
			++countDown;
		}
		maxCount = countDown;
	};
}