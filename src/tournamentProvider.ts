import TeemoJS from "../TeemoJS/src/index";

export interface TournamentProviderBody {
  apikey: string;
}

export interface TournamentProviderResp {
  apikey: string;
  region: string;
  url: string;
}

export async function tournamentProvider(
  body: TournamentProviderBody
): Promise<any> {
  try {
    const RiotApi = TeemoJS(body.apikey);
    delete body.apikey;
    const response = await RiotApi.req(
      "na",
      "tournament.stubV4.registerProviderData",
      {},
      {},
      body
    );
    return {
      providerId: response
    };
  } catch (err) {
    const error = await err.response.text();
    return JSON.parse(error);
  }
}
