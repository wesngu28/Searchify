export interface AlbumData {
    artists: string,
    img: string,
    main_artist: string,
    name: string,
    release_date: string,
    total_tracks: number,
    tracks: { [key: string]: string },
}