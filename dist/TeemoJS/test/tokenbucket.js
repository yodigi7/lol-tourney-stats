"use strict";
//const parallel = require('mocha.parallel');
var assert = require("assert");
var _a = require("../src"), TokenBucket = _a.TokenBucket, delayPromise = _a.delayPromise;
function testBurst(timespan, limit, count) {
    var bucket = new TokenBucket(timespan, limit);
    function makeReq() {
        var fn = function () {
            var delay = bucket.getDelay();
            if (delay >= 0)
                return delayPromise(delay).then(fn);
            bucket.getTokens(1);
            return Date.now();
        };
        return delayPromise(0).then(fn);
    }
    //let startTime = Date.now();
    var promises = Array(count).fill().map(makeReq);
    return Promise.all(promises).then(function (timestamps) {
        timestamps.sort();
        for (var i = 0, j = 1; i < timestamps.length; i++) {
            var maxTime = timestamps[i] + timespan;
            for (; j < timestamps.length; j++) {
                if (timestamps[j] > maxTime)
                    break;
            }
            assert.ok(j - i <= limit, (j - i) + ':\n' + JSON.stringify(timestamps.slice(i, j + 1), null, 2));
        }
    });
}
describe('TokenBucket', function () {
    this.slow(2000);
    var _loop_1 = function (i) {
        var timespan = i * 2;
        var limit = i * 10 - 10;
        var count = Math.max(limit + 10, 200);
        it("test burst " + count + " into " + limit + " per " + timespan, function () { return testBurst(timespan, limit, count); });
    };
    for (var i = 50; i < 200; i += 10) {
        _loop_1(i);
    }
});
