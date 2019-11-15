from riotwatcher import RiotWatcher, ApiError

from Match import Match

if __name__ == '__main__':
    watcher = RiotWatcher('RGAPI-d7c7530e-1eaf-4888-9ce0-e039e268635d')
    region = 'na1'
    print(Match(watcher.match.by_id(region, "3202121125")))
