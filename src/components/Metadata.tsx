import Head from 'next/head'

interface Props {
    title: string;
    keywords: string;
    description: string;
}

export default function Metadata ({ title, keywords, description }: Props) {
    return(
        <Head>
            <title>{title}</title>
            <meta name='keywords'>{keywords}</meta>
            <meta name='description'>{description}</meta>
            <meta charSet="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/public/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    )
}

Metadata.defaultProps = {
    title: 'Searchify',
    keywords: 'spotify stats, music',
    description: 'Get your top Spotify songs and artists and other Spotify information',
}