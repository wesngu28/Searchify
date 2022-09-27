import Head from 'next/head'
import aboutStyles from '../styles/About.module.css'

export default function About() {
    return (
        <>
            <Head>
                <title>Searchify - About</title>
            </Head>
            <h1>About this Web App</h1>
            <div className={aboutStyles.information}>
                <p>Searchify was the first real project I made since getting back into programming.</p>
                <p>Its first iteration was a Python Flask app that served templates as well as acted as a backend communicator to the Spotify API.
                The user would interact with the app through a Tkinter interface, and I expanded to include Pysimplegui as well.
                This worked for me at the time but I wanted the app to be more usable to non-programmers, but at the time I was not familiar with web dev or its technologies.
                After taking a web development course at my university, I saw a path to transitioning Searchify into a separate frontend website with a Python Flask backend.</p>
                <p>I considered caching the playlist responses and user data in a Redis database (rather than traditional databases as the data always changes),
                but decided against it.</p>
                <p>Technologies used: HTML, CSS, Typescript, Node.js, React, Next.js, Chart.js, Python, Flask, Vite/Tkinter/Pysimplegui (previous renditions)
                </p>
            </div>
        </>
    )
}