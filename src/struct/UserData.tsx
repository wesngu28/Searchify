export interface UserData {
    current_artists: string,
    current_song: string,
    img: string,
    name: string,
    top_artists: {
        "All Time": {
            [key: string]: string
        },
        "Last 4 Weeks": {
            [key: string]: string
        },
        "Last Six Months": {
            [key: string]: string
        }
    },
    top_songs: {
        "All Time": {
            [key: string]: string
        },
        "Last 4 Weeks": {
            [key: string]: string
        },
        "Last Six Months": {
            [key: string]: string
        }
    },
    error?: string,
}