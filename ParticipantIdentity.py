class ParticipantIdentity:
    def __init__(self, json=None):
        self.json = json
        self.participantId = None
        self.currentPlatformId = None
        self.summonerName = None
        self.matchHistoryUri = None
        self.platformId = None
        self.currentAccountId = None
        self.profileIcon = None
        self.summonerId = None
        self.accountId = None
        self.generateFromJson()

    def generateFromJson(self, json=None):
        if json:
            self.json = json
        if self.json:
            self.participantId = self.json['participantId']
            self.currentPlatformId = self.json['player']['currentPlatformId']
            self.summonerName = self.json['player']['summonerName']
            self.matchHistoryUri = self.json['player']['matchHistoryUri']
            self.platformId = self.json['player']['platformId']
            self.currentAccountId = self.json['player']['currentAccountId']
            self.profileIcon = self.json['player']['profileIcon']
            self.summonerId = self.json['player']['summonerId']
            self.accountId = self.json['player']['accountId']
