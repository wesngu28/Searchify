import Head from 'next/head'

export default function Metadata () {
    return(
        <Head>
            <title>Searchify</title>
            <meta name='keywords'>spotify stats, music</meta>
            <meta name='description'>Get your top Spotify songs and artists and other Spotify information</meta>
            <meta charSet="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/public/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    )
}