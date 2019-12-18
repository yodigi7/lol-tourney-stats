"use strict";
var TeemoJS = require("../src");
var assert = require("assert");
// No API key access.
xdescribe('TeemoJS', function () {
    var api;
    before(function () {
        var apiKey = process.env.RIOT_API_KEY;
        if (!apiKey)
            throw new Error('Must set RIOT_API_KEY in environment.');
        api = TeemoJS(apiKey, { maxConcurrent: 2 });
    });
    describe('#req() TFT', function () {
        it('championMastery.getAllChampionMasteries', function () {
            return api.req('euw1', 'tftLeague.getChallengerLeague')
                .then(function (data) {
                console.log(data);
                assert.ok(data);
                assert.ok(data.entries.length >= 10); // Should be a lot more.
            });
        });
    });
});
