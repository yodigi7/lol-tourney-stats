let express = require('express');
let env = require('node-env-file');
let app = express();
let RiotApi = require('./TeemoJS/index');
env('.env')

app.use(express.json());
RiotApi = RiotApi(process.env.RIOT_API_KEY, RiotApi.defaultConfig);

let tournament = async function(body) {
    try {
        let response = await RiotApi.send('americas', 'tournamentStubV4.registerTournament', {}, {}, body);
        return {
            tournamentId: response
        };
    } catch (err) {
        console.error(err.response);
    }
}

let tournamentProvider = async function(body) {
    try {
        let response = await RiotApi.send('americas', 'tournamentStubV4.registerProviderData', {}, {}, body);
        return {
            providerId: 568
        };
    } catch (err) {
        console.error(err.response);
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

app.listen(3000);