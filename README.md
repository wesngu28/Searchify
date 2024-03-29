# Searchify

A web app to view brief statistics, get Youtube links, and recommendations for Spotify tracks, albums, artists, and playlists, as well as get your top played artists and songs when logged in.

## About and Ramble

Backend is hosted on PythonAnywhere. The backend was initially a [script](https://github.com/wesngu28/SpotifyPlaylistInfo) that I converted to a [flask app](https://github.com/wesngu28/searchify-flask). At the time I was unfamiliar with most web dev technologies, but when I was enlightened I decided to undertake the task of converting this flask app to a full-stack app, keeping the Python backend but creating a separate front-end.

I spent a long time not doing anything on that front and it coincidentally linedup with me also procrastinating on teaching myself React and its fundamentals. After a lot of work and adding Next.js into the stack, I finally got to a point where I am happy with what I've done regarding what started as just a simple script.

I understand that exposing the provided access token in the query string is not a safe security practice, but I could not figure out implementation on cookies as the cookie made on pythonanywhere.com seems to not survive going to vercel.app, and I was lost on how to store the access token in a database meaningfully as I can't seem to find what user data I could use to associate a token with an account.

Frontend is hosted on Vercel.

Sadly searchify.vercel.app was already taken 😭