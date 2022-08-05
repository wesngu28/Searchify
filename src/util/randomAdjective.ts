export const randomAdjective = () => {
    const adjectives = ['admirable', 'amazing', 'astonishing', 'awesome', 'brilliant', 'cool', 'enjoyable', 'excellent', 'fabulous', 'fantastic', 'fine', 'incredible', 'magnificent', 'marvelous', 'outstanding', 'phenomenal', 'pleasant', 'pleasing', 'remarkable',
    'sensational', 'superb', 'great', 'terrific', 'tremendous', 'wondrous', 'astounding', 'awe-inspiring', 'divine', 'dynamite', 'groovy', 'exquisite', 'miraculous', 'peachy', 'prime', 'staggering', 'stupendous', 'super', 'swell', 'perfect', 'exceptional',
    'perfect', 'smash-hit', 'dynamite', 'breaktaking', 'stunning', 'unbelievable', 'spectacular', 'sublime', 'formidable', 'imposing', 'mind-boggling', 'mind-blowing', 'bussin', 'out of this world', 'amazeballs', 'eye-opening', 'prodigious', 'wonderful',
    'impressive', 'genius', 'mensa-level', 'unique', 'notable', 'life-changing', 'alluring', 'bewitching', 'captivating', 'charming', 'attractive', 'enchanting', 'entertaining', 'banger', 'enthralling', 'fascinating', 'interesting', 'dope', 'fantabulous',
    'grand', 'heavenly', 'high-class', 'hype', 'stellar', 'superior', 'good', 'satisfactory', 'talented', 'legendary', 'worthy of celebrating', 'worthy of worship', 'godlike', 'god-tier', 's-tier', 'immersive', 'bop', 'pog', 'poggingly',
    'adorable', 'booming', 'crisp', 'delicious', 'fatherly', 'friendly', 'glistering', 'iconic', 'hot', 'fire', 'lush', 'magical', 'menacing', 'jovial', 'overpowered', 'powerful', 'precious', 'proper', 'shiny', 'smooth', 'vivid', 'witty']
    return adjectives[Math.floor(Math.random()*adjectives.length)];
  }