from dto.Ban import Ban


class Team:
    def __init__(self, json=None):
        self.json = json
        self.bans = []
        self.baronKills = None
        self.dominionVictoryScore = None
        self.dragonKills = None
        self.firstBaron = None
        self.firstBlood = None
        self.firstDragon = None
        self.firstInhibitor = None
        self.firstRiftHarold = None
        self.firstTower = None
        self.inhibitorKills = None
        self.riftHeraldKills = None
        self.teamId = None
        self.towerKills = None
        self.vilemawKills = None
        self.win = None
        self.generateFromJson()

    def generateFromJson(self, json=None):
        if json:
            self.json = json
        if self.json:
            for ban in self.json['bans']:
                self.bans.append(Ban(ban))
            self.baronKills = self.json['baronKills']
            self.dominionVictoryScore = self.json['dominionVictoryScore']
            self.dragonKills = self.json['dragonKills']
            self.firstBaron = self.json['firstBaron']
            self.firstBlood = self.json['firstBlood']
            self.firstDragon = self.json['firstDragon']
            self.firstInhibitor = self.json['firstInhibitor']
            self.firstRiftHarold = self.json['firstRiftHerald']
            self.firstTower = self.json['firstTower']
            self.inhibitorKills = self.json['inhibitorKills']
            self.riftHeraldKills = self.json['riftHeraldKills']
            self.teamId = self.json['teamId']
            self.towerKills = self.json['towerKills']
            self.vilemawKills = self.json['vilemawKills']
            self.win = self.json['win']

    def __str__(self):
        # TODO
        return ''
