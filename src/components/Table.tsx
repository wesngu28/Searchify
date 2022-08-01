import '../styles/Table.css'

interface Props {
  head: string[];
  body: Array<{ [key: string]: string }>;
  usage: string;
}

export default function Table ({head, body, usage}: Props) {
    let mapper: string[][] = [];
    if (usage === 'music') {
      const constituentArrays: Array<object> = Object.values(body);
      const first = constituentArrays[0]
      const second = constituentArrays[1]
      const urls: Array<JSX.Element> = Object.values(second).map(url => {
        return <iframe src={`https://www.youtube.com/embed/${url.replace('https://www.youtube.com/watch?v=', '')}`}></iframe>
        // <a href={url}>Youtube Link</a>
      })
      const third = constituentArrays[2]
      mapper = Object.values(third).map((element, i) => {
          return [element, Object.values(first)[i], Object.values(urls)[i]]
      })
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
      <div className="table">
        <table>
          <thead>
            <tr>
              {head.map((item: string) => {
                return <th title={item}>{item}</th>;
              })}
            </tr>
            {mapper.map((arr, i) => {
              return (
                <tr>
                  {arr.map((element) => (
                    <td>{element}</td>
                  ))}
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    );
}