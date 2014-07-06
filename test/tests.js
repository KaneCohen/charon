define(['charon'], function(charon) {
	var run = function() {

		var d;
		// Use offset to compensate for user location.
		var off = new Date().getTimezoneOffset();
		var msOff = off*60;

		module("charon", {

			setup: function() {
				d = new Date();
			}

		});

		test("instantiation", 9, function() {
			var c = new charon(d);

			ok(c instanceof charon);
			ok(c.toDate() instanceof Date);

			ok(charon.today() instanceof charon);
			ok(charon.today().toDate() instanceof Date);

			ok(charon.tomorrow() instanceof charon);
			ok(charon.tomorrow().toDate() instanceof Date);

			ok(charon.yesterday() instanceof charon);
			ok(charon.yesterday().toDate() instanceof Date);

			var x = new charon('1991-08-25');
			var y = new charon();
			notEqual(x.unix(), y.unix());
		});

		test("timestamps", 2, function() {
			var c = new charon(d);

			equal(c.timestamp(), d.getTime());
			equal(c.unix(), Math.floor(d.getTime()/1000));
		});

		test("date parsing", 6, function() {
			var c = new charon(d);

			// msOff - compensation for timezone offset.

			// Simple date parseing. Will set inner date to 00:00:00 local.
			c = new charon('1991-08-25');
			equal(c.unix() - msOff, 683078400);

			// Normal parsing with local timezone.
			// Compare unix timestamp, but with compensation for local offset.
			c = new charon('1991-08-25 20:57:08');
			equal(c.unix() - msOff, 683153828);

			c = new charon('1991-08-25T20:57:08');
			equal(c.unix() - msOff, 683153828);

			// Create in UTC format - timezone compensation is automatic.
			c = charon.utc('1991-08-25T20:57:08');
			equal(c.unix(), 683153828);

			// Parse in normal mode with 0 offset and convert to UTC.
			c = new charon('1991-08-25T20:57:08+00:00');
			equal(c.utc().unix(), 683153828);

			// Parse in UTC mode and check unix timesamp.
			c = charon.utc('1991-08-25 20:57:08');
			equal(c.unix(), 683153828);
		});

		test("startOf method", 4, function() {
			var c = new charon(d);

			d.setMilliseconds(0);
			equal(c.startOf('second').timestamp(), d.getTime());
			d.setSeconds(0);
			equal(c.startOf('minute').timestamp(), d.getTime());
			d.setMinutes(0);
			equal(c.startOf('hour').timestamp(), d.getTime());
			d.setHours(0);
			equal(c.startOf('day').timestamp(), d.getTime());
		});

		test("fromNow method", 8, function() {
			var now = new charon(new Date);
			equal(now.fromNow(), 'just now');

			var fiveMinAgo = new charon(new Date().getTime() - (5 * 60 * 1000));
			equal(fiveMinAgo.fromNow(), '5 minutes ago');

			var fourtyFourMinAgo = new charon(new Date().getTime() - (44 * 60 * 1000));
			equal(fourtyFourMinAgo.fromNow(), '44 minutes ago');

			var fourtyFiveMinAgo = new charon(new Date().getTime() - (45 * 60 * 1000));
			equal(fourtyFiveMinAgo.fromNow(), 'an hour ago');

			var twentyHoursAgo = new charon(new Date().getTime() - (20 * 60 * 60 * 1000));
			equal(twentyHoursAgo.fromNow(), '20 hours ago');

			var twentyFourHoursAgo = new charon(new Date().getTime() - (24 * 60 * 60 * 1000));
			equal(twentyFourHoursAgo.fromNow(), 'a day ago');

			var twentyNineDaysAgo = new charon(new Date().getTime() - (29 * 24 * 60 * 60 * 1000));
			equal(twentyNineDaysAgo.fromNow(), '29 days ago');

			var thirtyOneDaysAgo = new charon(new Date().getTime() - (31 * 24 * 60 * 60 * 1000));
			var date = thirtyOneDaysAgo.format('{D} {MMMM}');
			equal(thirtyOneDaysAgo.fromNow(), date);
		});

	};

	return {run: run};
});
