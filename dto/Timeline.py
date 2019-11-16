class Timeline:
    def __init__(self, json=None):
        self.json = json
        self.lane = None
        self.participantId = None
        self.csDiffPerMinDeltas = None
        self.goldPerMinDeltas = None
        self.xpDiffPerMinDeltas = None
        self.creepsPerMinDeltas = None
        self.xpPerMinDeltas = None
        self.role = None
        self.damageTakenDiffPerMinDeltas = None
        self.damageTakenPerMinDeltas = None
        self.generateFromJson()

    def generateFromJson(self, json=None):
        if json:
            self.json = json
        if self.json:
            self.lane = self.json['lane']
            self.participantId = self.json['participantId']
            self.csDiffPerMinDeltas = self.json['csDiffPerMinDeltas']
            self.goldPerMinDeltas = self.json['goldPerMinDeltas']
            self.xpDiffPerMinDeltas = self.json['xpDiffPerMinDeltas']
            self.creepsPerMinDeltas = self.json['creepsPerMinDeltas']
            self.xpPerMinDeltas = self.json['xpPerMinDeltas']
            self.role = self.json['role']
            self.damageTakenDiffPerMinDeltas = self.json['damageTakenDiffPerMinDeltas']
            self.damageTakenPerMinDeltas = self.json['damageTakenPerMinDeltas']

