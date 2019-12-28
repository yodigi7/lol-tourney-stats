import { RiotMatch } from "../../lol-tournament-stats/src/riotInterfaces";
import {
  PersonStatistics,
  AggregatePersonStatistics
} from "../../lol-tournament-stats/src/internalInterfaces";

export class MatchParser {
  playerStatistics: Array<AggregatePersonStatistics>;
  games: Array<RiotMatch>;
  constructor(games: Array<RiotMatch>) {
    this.games = games;
    this.playerStatistics = [];
  }

  static aggregateStats(
    riotMatches: Array<RiotMatch>
  ): Array<AggregatePersonStatistics> {
    return MatchParser.aggregatePersonsStatistics(
      riotMatches.flatMap((match: RiotMatch) =>
        MatchParser.riotMatchToPersonStatistics(match)
      )
    );
  }

  static aggregatePersonsStatistics(
    personsStatistics: Array<PersonStatistics>
  ): Array<AggregatePersonStatistics> {
    let aggregateStats: Array<AggregatePersonStatistics> = [];
    let summoners: Array<string> = personsStatistics
      .map(stats => stats.summonerName)
      .filter((value, index, self) => self.indexOf(value) === index);

    for (let summoner of summoners) {
      let summonerStats = personsStatistics.filter(
        stats => stats.summonerName === summoner
      );
      aggregateStats.push(MatchParser.aggregatePersonStatistics(summonerStats));
    }

    return aggregateStats;
  }

  static aggregatePersonStatistics(
    personStatistics: Array<PersonStatistics>
  ): AggregatePersonStatistics {
    let average = function(key: keyof PersonStatistics): number {
      return (
        personStatistics
          .map(stats => stats[key] as number)
          .reduce((a: number, b: number) => a + b) / personStatistics.length
      );
    };
    return {
      gamesPlayed: personStatistics.length,
      avgKda: average("kda"),
      averageGameLength: average("gameDuration"),
      winRatio:
        personStatistics.filter(stats => stats.win).length /
        personStatistics.length,
      summonerName: personStatistics[0].summonerName,
      currentAccountId: personStatistics[0].currentAccountId,
      summonerId: personStatistics[0].summonerId,
      accountId: personStatistics[0].accountId,
      avgNeutralMinionsKilledTeamJungle: average("neutralMinionsKilledTeamJungle"),
      avgVisionScore: average("visionScore"),
      avgMagicDamageDealtToChampions: average("magicDamageDealtToChampions"),
      avgLargestMultiKill: average("largestMultiKill"),
      avgTotalTimeCrowdControlDealt: average("totalTimeCrowdControlDealt"),
      avgLongestTimeSpentLiving: average("longestTimeSpentLiving"),
      avgTripleKills: average("tripleKills"),
      avgKills: average("kills"),
      avgTotalScoreRank: average("totalScoreRank"),
      avgNeutralMinionsKilled: average("neutralMinionsKilled"),
      avgDamageDealtToTurrets: average("damageDealtToTurrets"),
      avgPhysicalDamageDealtToChampions: average("physicalDamageDealtToChampions"),
      avgDamageDealtToObjectives: average("damageDealtToObjectives"),
      avgTotalUnitsHealed: average("totalUnitsHealed"),
      avgTotalDamageTaken: average("totalDamageTaken"),
      avgWardsKilled: average("wardsKilled"),
      avgLargestCriticalStrike: average("largestCriticalStrike"),
      avgLargestKillingSpree: average("largestKillingSpree"),
      avgQuadraKills: average("quadraKills"),
      avgMagicDamageDealt: average("magicDamageDealt"),
      avgDamageSelfMitigated: average("damageSelfMitigated"),
      avgMagicalDamageTaken: average("magicalDamageTaken"),
      avgTrueDamageTaken: average("trueDamageTaken"),
      avgAssists: average("assists"),
      avgGoldSpent: average("goldSpent"),
      avgTrueDamageDealt: average("trueDamageDealt"),
      avgParticipantId: average("participantId"),
      avgPhysicalDamageDealt: average("physicalDamageDealt"),
      avgSightWardsBoughtInGame: average("sightWardsBoughtInGame"),
      avgTotalDamageDealtToChampions: average("totalDamageDealtToChampions"),
      avgPhysicalDamageTaken: average("physicalDamageTaken"),
      avgTotalPlayerScore: average("totalPlayerScore"),
      avgObjectivePlayerScore: average("objectivePlayerScore"),
      avgTotalDamageDealt: average("totalDamageDealt"),
      avgNeutralMinionsKilledEnemyJungle: average(
        "neutralMinionsKilledEnemyJungle"
      ),
      avgDeaths: average("deaths"),
      avgWardsPlaced: average("wardsPlaced"),
      avgPerkPrimaryStyle: average("perkPrimaryStyle"),
      avgPerkSubStyle: average("perkSubStyle"),
      avgTurretKills: average("turretKills"),
      avgTrueDamageDealtToChampions: average("trueDamageDealtToChampions"),
      avgGoldEarned: average("goldEarned"),
      avgKillingSprees: average("killingSprees"),
      avgUnrealKills: average("unrealKills"),
      avgChampLevel: average("champLevel"),
      avgDoubleKills: average("doubleKills"),
      avgInhibitorKills: average("inhibitorKills"),
      avgCombatPlayerScore: average("combatPlayerScore"),
      avgVisionWardsBoughtInGame: average("visionWardsBoughtInGame"),
      avgPentaKills: average("pentaKills"),
      avgTotalHeal: average("totalHeal"),
      avgTotalMinionsKilled: average("totalMinionsKilled"),
      avgTimeCCingOthers: average("timeCCingOthers")
    };
  }

  static riotMatchToPersonStatistics(
    match: RiotMatch
  ): Array<PersonStatistics> {
    let personsStatistics: Array<PersonStatistics> = [];

    for (let player of match.participantIdentities) {
      let participant = match.participants.find(participantItem => {
        return participantItem.participantId === player.participantId;
      });
      if (!participant) {
        throw new Error(
          `Somehow, the player with participant id of ${player.participantId} in participant identities list is not in the participants list`
        );
      }
      let personStatistics: PersonStatistics = {
        gameDuration: match.gameDuration,
        summonerName: player.player.summonerName,
        currentAccountId: player.player.currentAccountId,
        summonerId: player.player.summonerId,
        accountId: player.player.accountId,
        csDiffPerMinDeltas: participant.timeline.csDiffPerMinDeltas,
        goldPerMinDeltas: participant.timeline.goldPerMinDeltas,
        xpDiffPerMinDeltas: participant.timeline.xpDiffPerMinDeltas,
        creepsPerMinDeltas: participant.timeline.creepsPerMinDeltas,
        xpPerMinDeltas: participant.timeline.xpPerMinDeltas,
        damageTakenDiffPerMinDeltas:
          participant.timeline.damageTakenDiffPerMinDeltas,
        damageTakenPerMinDeltas: participant.timeline.damageTakenPerMinDeltas,
        kda: 0,
        neutralMinionsKilledTeamJungle:
          participant.stats.neutralMinionsKilledTeamJungle,
        visionScore: participant.stats.visionScore,
        magicDamageDealtToChampions:
          participant.stats.magicDamageDealtToChampions,
        largestMultiKill: participant.stats.largestMultiKill,
        totalTimeCrowdControlDealt:
          participant.stats.totalTimeCrowdControlDealt,
        longestTimeSpentLiving: participant.stats.longestTimeSpentLiving,
        tripleKills: participant.stats.tripleKills,
        kills: participant.stats.kills,
        totalScoreRank: participant.stats.totalScoreRank,
        neutralMinionsKilled: participant.stats.neutralMinionsKilled,
        damageDealtToTurrets: participant.stats.damageDealtToTurrets,
        physicalDamageDealtToChampions:
          participant.stats.physicalDamageDealtToChampions,
        damageDealtToObjectives: participant.stats.damageDealtToObjectives,
        totalUnitsHealed: participant.stats.totalUnitsHealed,
        totalDamageTaken: participant.stats.totalDamageTaken,
        wardsKilled: participant.stats.wardsKilled,
        largestCriticalStrike: participant.stats.largestCriticalStrike,
        largestKillingSpree: participant.stats.largestKillingSpree,
        quadraKills: participant.stats.quadraKills,
        magicDamageDealt: participant.stats.magicDamageDealt,
        firstBloodAssist: participant.stats.firstBloodAssist,
        damageSelfMitigated: participant.stats.damageSelfMitigated,
        magicalDamageTaken: participant.stats.magicalDamageTaken,
        firstInhibitorKill: participant.stats.firstInhibitorKill,
        trueDamageTaken: participant.stats.trueDamageTaken,
        assists: participant.stats.assists,
        goldSpent: participant.stats.goldSpent,
        trueDamageDealt: participant.stats.trueDamageDealt,
        participantId: participant.stats.participantId,
        physicalDamageDealt: participant.stats.physicalDamageDealt,
        sightWardsBoughtInGame: participant.stats.sightWardsBoughtInGame,
        totalDamageDealtToChampions:
          participant.stats.totalDamageDealtToChampions,
        physicalDamageTaken: participant.stats.physicalDamageTaken,
        totalPlayerScore: participant.stats.totalPlayerScore,
        win: participant.stats.win,
        objectivePlayerScore: participant.stats.objectivePlayerScore,
        totalDamageDealt: participant.stats.totalDamageDealt,
        neutralMinionsKilledEnemyJungle:
          participant.stats.neutralMinionsKilledEnemyJungle,
        deaths: participant.stats.deaths,
        wardsPlaced: participant.stats.wardsPlaced,
        perkPrimaryStyle: participant.stats.perkPrimaryStyle,
        perkSubStyle: participant.stats.perkSubStyle,
        turretKills: participant.stats.turretKills,
        firstBloodKill: participant.stats.firstBloodKill,
        trueDamageDealtToChampions:
          participant.stats.trueDamageDealtToChampions,
        goldEarned: participant.stats.goldEarned,
        killingSprees: participant.stats.killingSprees,
        unrealKills: participant.stats.unrealKills,
        firstTowerAssist: participant.stats.firstTowerAssist,
        firstTowerKill: participant.stats.firstTowerKill,
        champLevel: participant.stats.champLevel,
        doubleKills: participant.stats.doubleKills,
        inhibitorKills: participant.stats.inhibitorKills,
        firstInhibitorAssist: participant.stats.firstInhibitorAssist,
        combatPlayerScore: participant.stats.combatPlayerScore,
        visionWardsBoughtInGame: participant.stats.visionWardsBoughtInGame,
        pentaKills: participant.stats.pentaKills,
        totalHeal: participant.stats.totalHeal,
        totalMinionsKilled: participant.stats.totalMinionsKilled,
        timeCCingOthers: participant.stats.timeCCingOthers
      };
      personStatistics.kda =
        (personStatistics.kills + personStatistics.assists) /
        personStatistics.deaths;
      personsStatistics.push(personStatistics);
    }

    return personsStatistics;
  }
}
