export interface ArtistData {
    genre_list: string,
    genres: Array<string>,
    img: string,
    name: string,
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
    }
}