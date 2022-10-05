import tableStyles from '../styles/Table.module.css'

interface Props {
  head: string[];
  body: Array<{ [key: string]: string }>;
  usage: string;
}

export default function Table ({head, body, usage}: Props) {
    let mapper: string[][] = [];
    if (usage === 'music') {
      const constituentArrays: Array<object> = Object.values(body);
      if(constituentArrays.length >= 3) {
        const first = constituentArrays[0]
        const second = constituentArrays[1]
        const urls: Array<JSX.Element> = Object.values(second).map(url => {
          return <a target="_blank" rel="noopener noreferrer" key={url.id} href={url}>Youtube Link</a>
        })
        const third = constituentArrays[2]
        mapper = Object.values(third).map((element, i) => {
            return [element, Object.values(first)[i], Object.values(urls)[i]]
        })
      } else {
        head.pop()
        const artist = constituentArrays[0]
        const song = constituentArrays[1]
        mapper = Object.values(song).map((element, i) => {
          return [element, Object.values(artist)[i]]
        })
      }
    }
    if (usage === 'user') {
      const first: string[] = Object.values(body[0])
      const second: string[] = Object.values(body[1])
      const third: string[] = Object.values(body[2])
      mapper = second.map((element, i) => {
          return [element, third[i], first[i]]
      })
    }
    return (
      <div className={tableStyles.table_wrapper}>
        <table className={tableStyles.table}>
          <thead>
            <tr className={tableStyles.tr}>
              {head.map((item: string, idx) => {
                return <th key={idx} className={tableStyles.th} title={item}>{item}</th>;
              })}
            </tr>
            {mapper.map((arr, i) => {
              return (
                <tr key={i} className={tableStyles.tr}>
                  {arr.map((element, idx) => (
                    <td key={idx} className={tableStyles.td}>{element}</td>
                  ))}
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    );
}