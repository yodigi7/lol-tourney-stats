import { RiotMatch } from "./riotInterfaces";
import {
  PersonStatistics,
  AggregatePersonStatistics
} from "./internalInterfaces";

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
      kda: average("kda"),
      averageGameLength: average("gameDuration"),
      creepsKilled: average("creepsKilled"),
      winRatio:
        personStatistics.filter(stats => stats.win).length /
        personStatistics.length,
      summonerName: personStatistics[0].summonerName,
      currentAccountId: personStatistics[0].currentAccountId,
      summonerId: personStatistics[0].summonerId,
      accountId: personStatistics[0].accountId,
      neutralMinionsKilledTeamJungle: average("neutralMinionsKilledTeamJungle"),
      visionScore: average("visionScore"),
      magicDamageDealtToChampions: average("magicDamageDealtToChampions"),
      largestMultiKill: average("largestMultiKill"),
      totalTimeCrowdControlDealt: average("totalTimeCrowdControlDealt"),
      longestTimeSpentLiving: average("longestTimeSpentLiving"),
      tripleKills: average("tripleKills"),
      kills: average("kills"),
      totalScoreRank: average("totalScoreRank"),
      neutralMinionsKilled: average("neutralMinionsKilled"),
      damageDealtToTurrets: average("damageDealtToTurrets"),
      physicalDamageDealtToChampions: average("physicalDamageDealtToChampions"),
      damageDealtToObjectives: average("damageDealtToObjectives"),
      totalUnitsHealed: average("totalUnitsHealed"),
      totalDamageTaken: average("totalDamageTaken"),
      wardsKilled: average("wardsKilled"),
      largestCriticalStrike: average("largestCriticalStrike"),
      largestKillingSpree: average("largestKillingSpree"),
      quadraKills: average("quadraKills"),
      magicDamageDealt: average("magicDamageDealt"),
      damageSelfMitigated: average("damageSelfMitigated"),
      magicalDamageTaken: average("magicalDamageTaken"),
      trueDamageTaken: average("trueDamageTaken"),
      assists: average("assists"),
      goldSpent: average("goldSpent"),
      trueDamageDealt: average("trueDamageDealt"),
      participantId: average("participantId"),
      physicalDamageDealt: average("physicalDamageDealt"),
      sightWardsBoughtInGame: average("sightWardsBoughtInGame"),
      totalDamageDealtToChampions: average("totalDamageDealtToChampions"),
      physicalDamageTaken: average("physicalDamageTaken"),
      totalPlayerScore: average("totalPlayerScore"),
      objectivePlayerScore: average("objectivePlayerScore"),
      totalDamageDealt: average("totalDamageDealt"),
      neutralMinionsKilledEnemyJungle: average(
        "neutralMinionsKilledEnemyJungle"
      ),
      deaths: average("deaths"),
      wardsPlaced: average("wardsPlaced"),
      perkPrimaryStyle: average("perkPrimaryStyle"),
      perkSubStyle: average("perkSubStyle"),
      turretKills: average("turretKills"),
      trueDamageDealtToChampions: average("trueDamageDealtToChampions"),
      goldEarned: average("goldEarned"),
      killingSprees: average("killingSprees"),
      unrealKills: average("unrealKills"),
      champLevel: average("champLevel"),
      doubleKills: average("doubleKills"),
      inhibitorKills: average("inhibitorKills"),
      combatPlayerScore: average("combatPlayerScore"),
      visionWardsBoughtInGame: average("visionWardsBoughtInGame"),
      pentaKills: average("pentaKills"),
      totalHeal: average("totalHeal"),
      totalMinionsKilled: average("totalMinionsKilled"),
      timeCCingOthers: average("timeCCingOthers")
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
        creepsKilled: 0,
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
      personStatistics.creepsKilled =
        personStatistics.totalMinionsKilled -
        personStatistics.neutralMinionsKilledEnemyJungle -
        personStatistics.neutralMinionsKilledTeamJungle;
      personsStatistics.push(personStatistics);
    }

    return personsStatistics;
  }
}
