from Participant import Participant
from ParticipantIdentity import ParticipantIdentity
from Team import Team


class Match:
    def __init__(self, json=None):
        print(json)
        print(type(json))
        self.json = json
        self.seasonId = None
        self.queueId = None
        self.gameId = None
        self.participants = []
        self.participantIdentities = []
        self.gameVersion = None
        self.platformId = None
        self.gameMode = None
        self.mapId = None
        self.gameType = None
        self.teams = []
        self.gameDuration = None
        self.gameCreation = None
        self.generateFromJson()

    def generateFromJson(self, json=None):
        if json:
            self.json = json
        if self.json:
            self.seasonId = self.json['seasonId']
            self.queueId = self.json['queueId']
            self.gameId = self.json['gameId']
            self.gameVersion = self.json['gameVersion']
            self.platformId = self.json['platformId']
            self.gameMode = self.json['gameMode']
            self.mapId = self.json['mapId']
            self.gameType = self.json['gameType']
            self.gameDuration = self.json['gameDuration']
            self.gameCreation = self.json['gameCreation']
            for team in self.json['teams']:
                self.teams.append(Team(team))
            for participant in self.json['participants']:
                self.participants.append(Participant(participant))
            for participantIdentity in self.json['participantIdentities']:
                self.participantIdentities.append(ParticipantIdentity(participantIdentity))

    def __str__(self):
        # TODO: correctly handle lists
        return f'seasonId = {self.seasonId}\n' + f'queueId = {self.queueId}\n' + f'gameId = {self.gameId}\n' + \
               f'gameVersion = {self.gameVersion}\n' + f'platformId = {self.platformId}\n' + \
               f'gameMode = {self.gameMode}\n' + f'mapId = {self.mapId}\n' + f'gameType = {self.gameType}\n' + \
               f'gameDuration = {self.gameDuration}\n' + f'gameCreation = {self.gameCreation}\n' + \
               f'teams = {str(self.teams)}\n' + f'participants = {str(self.participants)}\n' + \
               f'participantIdentities = {str(self.participantIdentities)}\n'
