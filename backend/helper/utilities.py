import pandas as pd
from youtubesearchpython import VideosSearch
# from bs4 import BeautifulSoup
# import requests
# import json
# from timeit import default_timer as timer

# Uses the Youtube-Search-Python module to query youtube for corresponding links without a rate limit, appending them to a link list before creating a dataframe.
# I chose to use Pandas due to the ease of making a dataframe instead of having to handle an additional value or run an additional loop in later code to assign the correct link.
# I considered turning this into a flask route or using javascript to handle this to incorporate a progress bar or fetch, but decided against it.
def search_youtube(song_dict):
    # start = timer()
    link_list = []
    for track in song_dict:
        query = "{} - {}".format(track, song_dict[track])
        videosSearch = VideosSearch(query, limit = 1)
        result = videosSearch.result()
        link = result["result"][0]["link"]
        # r = requests.get(f'https://www.youtube.com/results?search_query={track} - {song_dict[track]}')
        # soup = BeautifulSoup(r.text, 'html')
        # soupScript = soup.find_all('script')

        # viableScript = ''
        # for script in soupScript:
        #     if('ytInitialData' in script.text):
        #         viableScript = script.text
        #         break

        # viableScript = viableScript.replace('var ytInitialData = ', '')
        # viableScript = viableScript.replace(';', '')
        # j = json.loads(viableScript)
        # finder = j['contents']['twoColumnSearchResultsRenderer']['primaryContents']['sectionListRenderer']['contents']
        # for obj in finder:
        #     if ('itemSectionRenderer' in obj):
        #         for object in obj['itemSectionRenderer']['contents']:
        #             if('videoRenderer' in object):
        #                 id = object['videoRenderer']['videoId']
        # link = f'https://www.youtube.com/watch?v={id}'
        # print(f"Song {track}'s link {link}")
        link_list.append(link)
    df = pd.DataFrame(list(song_dict.items()),columns = ['Song Name','Artists'])
    df['Song Link'] = link_list
    # end = timer()
    # print(end-start)
    return df

def build_dataframe_without_youtube_links(song_dict):
    df = pd.DataFrame(list(song_dict.items()),columns = ['Song Name','Artists'])
    return df

# Function to convert the duration_ms returned by Spotify to something readable by normal human beings.
def readable_time(duration):
    minutes = (duration / (60*1000)) % 60
    minutes = int(minutes)
    sec = (duration / 1000) % 60
    sec = int(sec)
    return f"{minutes} minutes and {sec} seconds"