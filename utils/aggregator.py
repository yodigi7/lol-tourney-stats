from dto.Match import Match
from dto.ParticipantIdentity import ParticipantIdentity


class PlayerAggregator:
    def __init__(self, summonerName=None, matches=[]):
        self.summonerName = summonerName
        self.matches = matches
        self.generateStats()

    def generateStats(self):
        if self.summonerName:
            match: Match
            for match in self.matches:
                participantId: ParticipantIdentity
                for participantId in match.participantIdentities:
                    if participantId.summonerName is self.summonerName:

