from Stats import Stats
from Timeline import Timeline


class Participant:
    def __init__(self, json=None):
        self.json = json
        self.championId = None
        self.participantId = None
        self.spell1Id = None
        self.spell2Id = None
        self.teamId = None
        self.stats = None
        self.timeline = None
        self.generateFromJson()

    def generateFromJson(self, json=None):
        if json:
            self.json = json
        if self.json:
            self.championId = self.json['championId']
            self.participantId = self.json['participantId']
            self.spell1Id = self.json['spell1Id']
            self.spell2Id = self.json['spell2Id']
            self.teamId = self.json['teamId']
            self.timeline = Timeline(self.json['timeline'])
            self.stats = Stats(self.json['stats'])

    def __str__(self):
        return f'championId = {self.championId}\n' + f'participantId = {self.participantId}\n' + \
               f'spell1Id = {self.spell1Id}\n' + 'spell2Id = {self.spell2Id}\n' + \
               f'teamId = {self.teamId}\n' + f'stats = {self.stats}\n' + f'timeline = {self.timeline}\n'
