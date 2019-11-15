class Ban:
    def __init__(self, json=None, championId=None, pickTurn=None):
        self.json = json
        self.championId = championId
        self.pickTurn = pickTurn
        self.generateFromJson()

    def generateFromJson(self, json=None):
        if json:
            self.json = json
        if self.json:
            self.championId = self.json['championId']
            self.pickTurn = self.json['pickTurn']

    def __str__(self):
        return f'championId = {self.championId}' + f'pickTurn = {self.pickTurn}'
