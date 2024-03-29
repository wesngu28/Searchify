import time
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import numpy as np

def user_info(sp):
    user_dict = sp.current_user()
    user_current_track = sp.current_user_playing_track()
    current_song = ''
    current_song_artist = ''
    if(user_current_track):
        current_song = user_current_track['item']['name']
        current_artists = []
        for artist in user_current_track['item']['artists']:
            current_artists.append(artist['name'])
        if (len(current_artists) > 1):
            current_artists.insert(len(current_artists)-1, 'and')
            current_song_artist = ''
            for artist in current_artists:
                current_song_artist = current_song_artist + artist + ', '
            current_song_artist = current_song_artist[:-2]
            current_song_artist = current_song_artist.replace(', and,', ' and')
        else:
            current_song_artist = current_artists[0]

    short_term_artist = []
    medium_term_artist = []
    long_term_artist = []
    user_top_artists = sp.current_user_top_artists(time_range = 'short_term')
    for artist in user_top_artists['items']:
        short_term_artist.append(artist['name'])
    user_top_artists = sp.current_user_top_artists(time_range = 'medium_term')
    for artist in user_top_artists['items']:
        medium_term_artist.append(artist['name'])
    user_top_artists = sp.current_user_top_artists(time_range = 'long_term')
    for artist in user_top_artists['items']:
        long_term_artist.append(artist['name'])
    artistDict = dict( Short = np.array(short_term_artist), Medium = np.array(medium_term_artist), Long = np.array(long_term_artist) )
    top_artists = pd.DataFrame(dict([ (k,pd.Series(v)) for k,v in artistDict.items() ]))
    top_artists.columns = ['Last 4 Weeks', 'Last Six Months', 'All Time']
    top_artists = top_artists.fillna('No Data')
    print(top_artists)
    top_artists = top_artists.to_dict()
    short_term_track = []
    medium_term_track = []
    long_term_track = []
    user_top_songs = sp.current_user_top_tracks(time_range = 'short_term')
    for song in user_top_songs['items']:
        short_term_track.append(song['name'])
    for idx, artist in enumerate(user_top_songs['items']):
        if(len(artist['artists']) > 1):
            artist_count = 0
            artist_string = ''
            while(artist_count < len(artist['artists'])):
                artist_string = artist_string + artist['artists'][artist_count]['name'] + ', '
                artist_count = artist_count + 1
            artist_string = artist_string[:-2]
            short_term_track[idx] = f"{short_term_track[idx]} by {artist_string}"
        else:
            short_term_track[idx] = f"{short_term_track[idx]} by {(artist['artists'][0]['name'])}"

    user_top_songs = sp.current_user_top_tracks(time_range = 'medium_term')
    for song in user_top_songs['items']:
        medium_term_track.append(song['name'])
    for idx, artist in enumerate(user_top_songs['items']):
        if(len(artist['artists']) > 1):
            artist_count = 0
            artist_string = ''
            while(artist_count < len(artist['artists'])):
                artist_string = artist_string + artist['artists'][artist_count]['name'] + ', '
                artist_count = artist_count + 1
            artist_string = artist_string[:-2]
            medium_term_track[idx] = f"{medium_term_track[idx]} by {artist_string}"
        else:
            medium_term_track[idx] = f"{medium_term_track[idx]} by {(artist['artists'][0]['name'])}"

    user_top_songs = sp.current_user_top_tracks(time_range = 'long_term')
    for song in user_top_songs['items']:
        long_term_track.append(song['name'])
    for idx, artist in enumerate(user_top_songs['items']):
        if(len(artist['artists']) > 1):
            artist_count = 0
            artist_string = ''
            while(artist_count < len(artist['artists'])):
                artist_string = artist_string + artist['artists'][artist_count]['name'] + ', '
                artist_count = artist_count + 1
            artist_string = artist_string[:-2]
            long_term_track[idx] = f"{long_term_track[idx]} by {artist_string}"
        else:
            long_term_track[idx] = f"{long_term_track[idx]} by {(artist['artists'][0]['name'])}"
    songDict = dict( Short = np.array(short_term_track), Medium = np.array(medium_term_track), Long = np.array(long_term_track) )
    top_songs = pd.DataFrame(dict([ (k,pd.Series(v)) for k,v in songDict.items() ]))
    top_songs.columns = ['Last 4 Weeks', 'Last Six Months', 'All Time']
    top_songs = top_songs.fillna('No Data')
    top_songs = top_songs.to_dict()
    user = {
        'name' : user_dict['display_name'],
        'img' : user_dict['images'][0]['url'],
        'current_song' : current_song,
        'current_artists': current_song_artist,
        'top_artists' : top_artists,
        'top_songs' : top_songs
    }
    return user