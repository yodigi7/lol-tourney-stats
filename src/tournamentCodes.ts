import { MapType, SpectatorType, PickType } from "./enums";

import TeemoJS from "../TeemoJS/src/index";

interface TournamentCodesBody {
  apikey: string;
  count: number;
  tournamentId: number;
  teamSize: number;
  mapType: MapType;
  spectatorType: SpectatorType;
  pickType: PickType;
}

export async function tournamentCodes(body: TournamentCodesBody): Promise<any> {
  try {
    const RiotApi = TeemoJS(body.apikey);
    const count = body.count;
    const tournamentId = body.tournamentId;
    delete body.count;
    delete body.tournamentId;
    delete body.apikey;
    const response = await RiotApi.req(
      "americas",
      "tournament.stubV4.createTournamentCode",
      {},
      { count: count, tournamentId: tournamentId },
      body
    );
    return {
      tournamentCodes: response
    };
  } catch (err) {
    const error = await err.response.text();
    return JSON.parse(error);
  }
}
