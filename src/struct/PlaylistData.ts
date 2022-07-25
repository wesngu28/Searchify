export interface PlaylistData {
    created: string,
    frequent: string,
    frequent_count: string,
    img: string,
    name: string,
    size: string,
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