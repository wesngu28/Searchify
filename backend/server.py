from flask import Flask, request, redirect
from config import SPOTIFY_AUTH_URL, SPOTIFY_TOKEN_URL, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, AUTH_QUERY_PARAMETERS
from spotipy.oauth2 import SpotifyClientCredentials
from helper.album import album_info
from helper.artist import artist_info
from helper.playlist import playlist_info
from helper.track import track_info
from helper.utilities import search_youtube
from helper.user import user_info
from helper.utilities import build_dataframe_without_youtube_links
import requests
import json
import spotipy

app = Flask(__name__)
access_token = 'Not set'
client_id = CLIENT_ID
client_secret = CLIENT_SECRET
client_credentials_manager = SpotifyClientCredentials(client_id=client_id,client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

@app.route("/callback/")
def callback():
    try:
      auth_token = request.args['code']
      code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
      }
      post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload)
      response_data = json.loads(post_request.text)
      global access_token
      access_token = response_data["access_token"]
      return(redirect('http://localhost:3000/profile'))
    except:
      return('Fail')

@app.route("/auth/")
def authentication():
    params_list = ''
    for i, j in AUTH_QUERY_PARAMETERS.items():
        params_list = params_list + i + '=' + j + '&'
    params_list = params_list[:-1]
    return(redirect(f"{SPOTIFY_AUTH_URL}/?{params_list}"))

@app.route('/check')
def check():
    if(access_token == 'Not set'):
        return 'not logged'
    return 'is logged'

@app.route("/user")
def user():
    try:
        sp = spotipy.Spotify(auth=access_token)
        response = user_info(sp)
        return(response)
    except:
        return('tis but a test')

@app.route("/search/playlist/<searchField>")
def playlist(searchField):
    link = request.args.get('links')
    response = playlist_info(sp, searchField)
    if (link == 'yes'):
        recommendations = search_youtube(response['tracks'])
        response['tracks'] = recommendations.to_dict()
        return(response)
    song_df = build_dataframe_without_youtube_links(response['tracks'])
    response['tracks'] = song_df.to_dict()
    return(response)

@app.route("/search/artist/<searchField>")
def artist(searchField):
    link = request.args.get('links')
    print(link)
    response = artist_info(sp, searchField)
    if (link == 'yes'):
        recommendations = search_youtube(response['tracks'])
        response['tracks'] = recommendations.to_dict()
        return(response)
    song_df = build_dataframe_without_youtube_links(response['tracks'])
    response['tracks'] = song_df.to_dict()
    return(response)

@app.route("/search/track/<searchField>")
def track(searchField):
    link = request.args.get('links')
    response = track_info(sp, searchField)
    if (link == 'yes'):
        recommendations = search_youtube(response['tracks'])
        response['tracks'] = recommendations.to_dict()
        return(response)
    song_df = build_dataframe_without_youtube_links(response['tracks'])
    response['tracks'] = song_df.to_dict()
    return(response)

@app.route("/search/album/<searchField>")
def album(searchField):
    link = request.args.get('links')
    response = album_info(sp, searchField)
    if (link == 'yes'):
        recommendations = search_youtube(response['tracks'])
        response['tracks'] = recommendations.to_dict()
        return(response)
    song_df = build_dataframe_without_youtube_links(response['tracks'])
    response['tracks'] = song_df.to_dict()
    return(response)

if __name__ == "__main__":
  app.run(debug=False)
