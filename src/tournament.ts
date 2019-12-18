import TeemoJS from "../TeemoJS/src/index";

interface TournamentBody {
  apikey: string;
  name: string;
  provider: number;
}

export async function tournament(body: TournamentBody): Promise<any> {
  try {
    const RiotApi = TeemoJS(body.apikey);
    delete body.apikey;
    const response = await RiotApi.req(
      "americas",
      "tournament.stubV4.registerTournament",
      {},
      {},
      body
    );
    return {
      tournamentId: response
    };
  } catch (err) {
    const error = await err.response.text();
    return JSON.parse(error);
  }
}
