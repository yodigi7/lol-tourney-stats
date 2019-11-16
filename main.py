from riotwatcher import RiotWatcher
from dto.Match import Match
import settings
import os

if __name__ == '__main__':
    watcher = RiotWatcher(os.getenv('RIOT_API_KEY'))
    region = os.getenv('REGION')
    print(region)
    print(Match(watcher.match.by_id(region, "3202121125")).json)
