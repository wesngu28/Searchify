export default function Blurb({blurb}) {

    const randomAdjective = () => {
        const adjectives = ['admirable', 'amazing', 'astonishing', 'awesome', 'brilliant', 'cool', 'enjoyable', 'excellent', 'fabulous', 'fantastic', 'fine', 'incredible', 'magnificent', 'marvelous', 'outstanding', 'phenomenal', 'pleasant', 'pleasing', 'remarkable',
        'sensational', 'superb', 'great', 'terrific', 'tremendous', 'wondrous', 'astounding', 'awe-inspiring', 'divine', 'dynamite', 'groovy', 'exquisite', 'miraculous', 'peachy', 'prime', 'staggering', 'stupendous', 'super', 'swell', 'perfect', 'exceptional',
        'perfect', 'smash-hit', 'dynamite', 'breaktaking', 'stunning', 'unbelievable', 'spectacular', 'sublime', 'formidable', 'imposing', 'mind-boggling', 'mind-blowing', 'bussin', 'out of this world', 'amazeballs', 'eye-opening', 'prodigious', 'wonderful',
        'impressive', 'genius', 'mensa-level', 'unique', 'notable', 'life-changing', 'alluring', 'bewitching', 'captivating', 'charming', 'attractive', 'enchanting', 'entertaining', 'banger', 'enthralling', 'fascinating', 'interesting', 'dope', 'fantabulous',
        'grand', 'heavenly', 'high-class', 'hype', 'stellar', 'superior', 'good', 'satisfactory', 'talented', 'legendary', 'worthy of celebrating', 'worthy of worship', 'godlike', 'god-tier', 's-tier', 'immersive', 'bop', 'pog', 'poggingly',
        'adorable', 'booming', 'crisp', 'delicious', 'fatherly', 'friendly', 'glistering', 'iconic', 'hot', 'fire', 'lush', 'magical', 'menacing', 'jovial', 'overpowered', 'powerful', 'precious', 'proper', 'shiny', 'smooth', 'vivid', 'witty']
        return adjectives[Math.floor(Math.random()*adjectives.length)];
    }

    if(blurb.genre_list) {
        return(
            <p>The {randomAdjective()} {blurb.name} is a {blurb.main_genre} artist. They make {randomAdjective()} music of {blurb.genre_list} genres.</p>
        )
    }
    if(blurb.duration) {
        return(
            <p>The {randomAdjective()} song {blurb.name} was made by the {randomAdjective()} {blurb.artist}. It was released on {blurb.release} in the {randomAdjective()} album {blurb.album}.</p>
        )
    }
    if(blurb.frequent_count) {
        return(
            <p>{blurb.name} was created on {blurb.created}. This {randomAdjective()} playlist has size {blurb.size} with the {randomAdjective()} {blurb.frequent} being the most frequent, appearing {blurb.frequent_count}.</p>
        )
    }
    if(blurb.release_date) {
        return(
            <p>The {randomAdjective()} {blurb.name} is an album by the {randomAdjective()} {blurb.main_artist}. Released on {blurb.release_date}, it has {randomAdjective()} {blurb.total_tracks} total songs.</p>
        )
    }
    return(
        <p></p>
    )
}