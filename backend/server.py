from flask import Flask, request, redirect
from config import SPOTIFY_AUTH_URL, SPOTIFY_TOKEN_URL, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, AUTH_QUERY_PARAMETERS
from spotipy.oauth2 import SpotifyClientCredentials
from helper.album import album_info
from helper.artist import artist_info
from helper.playlist import playlist_info
from helper.track import track_info
from helper.utilities import search_youtube
from helper.user import user_info
import requests
import json
import spotipy
from youtubesearchpython import VideosSearch

app = Flask(__name__)
access_token = 'Not set'
client_id = CLIENT_ID
client_secret = CLIENT_SECRET
client_credentials_manager = SpotifyClientCredentials(client_id=client_id,client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

@app.route("/callback/")
def callback():
    print(request.referrer)
    print('at callback')
    print('here')
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
    try:
        sp = spotipy.Spotify(auth=access_token)
        response = user_info(sp)
        return(redirect('http://localhost:3000/profile'))
    except:
        params_list = ''
        for i, j in AUTH_QUERY_PARAMETERS.items():
            params_list = params_list + i + '=' + j + '&'
        params_list = params_list[:-1]
        print('Tacha')
        response = f"{SPOTIFY_AUTH_URL}/?{params_list}"
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
    response = playlist_info(sp, searchField)
    recommendations = search_youtube(response['tracks'])
    response['tracks'] = recommendations.to_dict()
    return(response)

@app.route("/search/artist/<searchField>")
def artist(searchField):
    response = artist_info(sp, searchField)
    print(response['tracks'])
    recommendations = search_youtube(response['tracks'])
    response['tracks'] = recommendations.to_dict()
    return(response)

@app.route("/search/track/<searchField>")
def track(searchField):
    response = track_info(sp, searchField)
    recommendations = search_youtube(response['tracks'])
    response['tracks'] = recommendations.to_dict()
    return(response)

@app.route("/search/album/<searchField>")
def album(searchField):
    response = album_info(sp, searchField)
    return(response)

if __name__ == "__main__":
  app.run(debug=True)
