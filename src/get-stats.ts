import TeemoJS from "../TeemoJS/src/index";
import { MatchParser } from "lol-tournament-stats";

interface Id {
  matchId: string;
  tournamentCode?: string;
}

interface GetStatsBody {
  apikey: string;
  ids: Array<Id>;
}

export async function getStats(body: GetStatsBody): Promise<any> {
  let stats: any;
  const RiotApi = TeemoJS(body.apikey);
  delete body.apikey;
  try {
    stats = await Promise.all(body.ids.map(async id => {
      if (id.tournamentCode) {
          console.log(id);
        return await RiotApi.req(
          "na",
          "lol.matchV4.getMatchByTournamentCode",
          [id.matchId, id.tournamentCode]
        );
      } else {
        return await RiotApi.req("na", "lol.matchV4.getMatch", id.matchId);
      }
    }));
  } catch (err) {
    console.log(err.response.body);
    const error = await err.response.text();
    return JSON.parse(error);
  }
  console.log(stats[0].participantIdentities[0]);
  let aggregatedStats = MatchParser.aggregateStats(stats);
  return {
    stats: aggregatedStats
  };
}
