import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Dict } from '../struct/Dict';

interface Props {
  filter: Dict;
}

const processData = (playlistArtist: Dict) => {
    const dataSet: string[] = Object.values(playlistArtist)
    for(let i = 0; i < dataSet.length; i++) {
        if(dataSet[i].includes(',')) {
            const individualArtist = dataSet[i].split(', ')
            dataSet.splice(i, 1)
            individualArtist.forEach(artist => {
                dataSet.push(artist)
            });
        }
    }
    let countValues = countOccurrences(dataSet)
    countValues = Object.fromEntries(Object.entries(countValues).sort((a,b) => b[1]-a[1]))
    const keys: string[] = Object.keys(countValues);
    const values: string[] = Object.values(countValues);
    let potentialExcess = [];
    if(keys.length > 9) {
        potentialExcess.push(keys.splice(9))
        potentialExcess.push(values.splice(9))
        keys.push('Other')
        values.push(String(potentialExcess[0].length))
    }
    const backgroundColors = [];
    const borderColors = [];
    for(let i = 0; i < keys.length; i++) {
        const color1 = Math.floor(Math.random() * 255);
        const color2 = Math.floor(Math.random() * 255);
        const color3 = Math.floor(Math.random() * 255);
        backgroundColors.push(`rgba(${color1}, ${color2}, ${color3}, 0.2)`);
        borderColors.push(`rgba(${color1}, ${color2}, ${color3}, 1)`);
    }
    const data = {
        labels: keys,
        datasets: [
          {
            label: '# of Occurrences',
            data: values,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
          },
        ],
    }
    return data
    function countOccurrences(arr: Array<any>) {
        return arr.reduce((a, b) => {
          a[b] = a[b] + 1 || 1
          return a;
        }, {});
      }
}

export default function Pastry({filter}: Props) {
    const data = processData(filter);
    ChartJS.register(ArcElement, Tooltip, Legend);
    return <Doughnut data={data} />
}