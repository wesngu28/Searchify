from flask import Blueprint, request, redirect, session
from api.config import SPOTIFY_AUTH_URL, SPOTIFY_TOKEN_URL, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, AUTH_QUERY_PARAMETERS
from pathlib import Path
import requests
import pandas as pd
import json

auth = Blueprint('auth', __name__)

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
      print(access_token)
      return(redirect('http://127.0.0.1:5500/home.html'))
    except:
      return('Fail')

@app.route("/auth/")
def authentication():
    try:
        sp = spotipy.Spotify(auth=access_token)
        response = user_info(sp)
        print(response)
        return(response)
    except:
        params_list = ''
        for i, j in AUTH_QUERY_PARAMETERS.items():
            params_list = params_list + i + '=' + j + '&'
        params_list = params_list[:-1]
        print('Tacha')
        response = f"{SPOTIFY_AUTH_URL}/?{params_list}"
        return(response)

#Function that creates a download folder in the directory and downloads CSVs to it
fileLocation = Path(__file__).parent
@auth.route('/download-csv')
def downloadCSV():
    link_dict = session['links']
    link_df = pd.DataFrame(link_dict)
    info_dict = session['info']
    output_csv = info_dict['name'] + ".csv"
    dl = Path('downloads')
    dl.mkdir(parents=True,exist_ok=True)
    link_df.to_csv('downloads/' + output_csv, index=False)
    return f"File saved to: {str(fileLocation)} with name {output_csv}"