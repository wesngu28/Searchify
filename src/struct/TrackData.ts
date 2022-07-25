export interface TrackData {
    album: string,
    artist: string,
    duration: string,
    name: string,
    release: string,
    tracks: {
        artists: {
            [key: string]: string
        },
        "Song Link": {
            [key: string]: string
        },
        "Song Name": {
            [key: string]: string
        }
    },
}