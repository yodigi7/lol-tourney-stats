let express = require('express');
let env = require('node-env-file');
let app = express();
let TeemoJS = require('./TeemoJS/src/index');
env('.env');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

let tournamentProvider = async function(body) {
    try {
        let RiotApi = TeemoJS(body.apikey);
        delete body.apikey;
        let response = await RiotApi.req('na', 'tournament.stubV4.registerProviderData', {}, {}, body);
        return {
            providerId: response
        };
    } catch (err) {
        let error = await err.response.text();
        return JSON.parse(error);
    }
}

let tournament = async function(body) {
    try {
        let RiotApi = TeemoJS(body.apikey);
        delete body.apikey;
        let response = await RiotApi.req('americas', 'tournament.stubV4.registerTournament', {}, {}, body);
        return {
            tournamentId: response
        };
    } catch (err) {
        let error = await err.response.text();
        return JSON.parse(error);
    }
}

let tournamentCodes = async function(body) {
    try {
        let RiotApi = TeemoJS(body.apikey);
        let count  = body.count;
        let tournamentId = body.tournamentId;
        delete body.count; delete body.tournamentId; delete body.apikey;
        let response = await RiotApi.req('americas', 'tournament.stubV4.createTournamentCode', {}, {count: count, tournamentId: tournamentId}, body);
        return {
            tournamentCodes: response
        };
    } catch (err) {
        let error = await err.response.text();
        return JSON.parse(error);
    }
}

app.post('/tournament-provider', async function(req, res){
    tournamentProvider(req.body)
        .then(result => res.json(result))
        .catch(err => console.error(err));
});

app.post('/tournament', async function(req, res){
    tournament(req.body)
        .then(result => res.json(result))
        .catch(err => console.error(err));
});

app.post('/tournament-codes', async function(req, res){
    tournamentCodes(req.body)
        .then(result => res.json(result))
        .catch(err => console.error(err));
});

app.listen(3000);