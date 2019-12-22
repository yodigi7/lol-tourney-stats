export interface PersonStatistics {
  kda: number;
  gameDuration: number;
  creepsKilled: number;
  summonerName: string;
  currentAccountId: string;
  summonerId: string;
  accountId: string;
  csDiffPerMinDeltas: {
    [key: string]: number;
  };
  goldPerMinDeltas: {
    [key: string]: number;
  };
  xpDiffPerMinDeltas: {
    [key: string]: number;
  };
  creepsPerMinDeltas: {
    [key: string]: number;
  };
  xpPerMinDeltas: {
    [key: string]: number;
  };
  damageTakenDiffPerMinDeltas: {
    [key: string]: number;
  };
  damageTakenPerMinDeltas: {
    [key: string]: number;
  };
  neutralMinionsKilledTeamJungle: number;
  visionScore: number;
  magicDamageDealtToChampions: number;
  largestMultiKill: number;
  totalTimeCrowdControlDealt: number;
  longestTimeSpentLiving: number;
  tripleKills: number;
  kills: number;
  totalScoreRank: number;
  neutralMinionsKilled: number;
  damageDealtToTurrets: number;
  physicalDamageDealtToChampions: number;
  damageDealtToObjectives: number;
  totalUnitsHealed: number;
  totalDamageTaken: number;
  wardsKilled: number;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  quadraKills: number;
  magicDamageDealt: number;
  firstBloodAssist: boolean;
  damageSelfMitigated: number;
  magicalDamageTaken: number;
  firstInhibitorKill: boolean;
  trueDamageTaken: number;
  assists: number;
  goldSpent: number;
  trueDamageDealt: number;
  participantId: number;
  physicalDamageDealt: number;
  sightWardsBoughtInGame: number;
  totalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  totalPlayerScore: number;
  win: boolean;
  objectivePlayerScore: number;
  totalDamageDealt: number;
  neutralMinionsKilledEnemyJungle: number;
  deaths: number;
  wardsPlaced: number;
  perkPrimaryStyle: number;
  perkSubStyle: number;
  turretKills: number;
  firstBloodKill: boolean;
  trueDamageDealtToChampions: number;
  goldEarned: number;
  killingSprees: number;
  unrealKills: number;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  champLevel: number;
  doubleKills: number;
  inhibitorKills: number;
  firstInhibitorAssist: boolean;
  combatPlayerScore: number;
  visionWardsBoughtInGame: number;
  pentaKills: number;
  totalHeal: number;
  totalMinionsKilled: number;
  timeCCingOthers: number;
}

export interface AggregatePersonStatistics {
  gamesPlayed: number;
  kda: number;
  averageGameLength: number;
  creepsKilled: number;
  winRatio: number;

  summonerName: string;
  currentAccountId: string;
  summonerId: string;
  accountId: string;
  neutralMinionsKilledTeamJungle: number;
  visionScore: number;
  magicDamageDealtToChampions: number;
  largestMultiKill: number;
  totalTimeCrowdControlDealt: number;
  longestTimeSpentLiving: number;
  tripleKills: number;
  kills: number;
  totalScoreRank: number;
  neutralMinionsKilled: number;
  damageDealtToTurrets: number;
  physicalDamageDealtToChampions: number;
  damageDealtToObjectives: number;
  totalUnitsHealed: number;
  totalDamageTaken: number;
  wardsKilled: number;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  quadraKills: number;
  magicDamageDealt: number;
  damageSelfMitigated: number;
  magicalDamageTaken: number;
  trueDamageTaken: number;
  assists: number;
  goldSpent: number;
  trueDamageDealt: number;
  participantId: number;
  physicalDamageDealt: number;
  sightWardsBoughtInGame: number;
  totalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  totalPlayerScore: number;
  objectivePlayerScore: number;
  totalDamageDealt: number;
  neutralMinionsKilledEnemyJungle: number;
  deaths: number;
  wardsPlaced: number;
  perkPrimaryStyle: number;
  perkSubStyle: number;
  turretKills: number;
  trueDamageDealtToChampions: number;
  goldEarned: number;
  killingSprees: number;
  unrealKills: number;
  champLevel: number;
  doubleKills: number;
  inhibitorKills: number;
  combatPlayerScore: number;
  visionWardsBoughtInGame: number;
  pentaKills: number;
  totalHeal: number;
  totalMinionsKilled: number;
  timeCCingOthers: number;
}

export interface TeamStatistics {
  [key: string]: any;
}
