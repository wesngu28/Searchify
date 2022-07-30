import '../styles/Table.css'

export default function Table ({head, body, usage}) {
    let mapper = [];
    if (usage === 'music') {
      const constituentArrays: Array<object> = Object.values(body);
      const first = constituentArrays[0]
      const second = constituentArrays[1]
      const urls: Array<JSX.Element> = Object.values(second).map(url => {
        return <a href={url}>Youtube Link</a>
      })
      const third = constituentArrays[2]
      mapper = Object.values(third).map((element, i) => {
          return [element, Object.values(first)[i], Object.values(urls)[i]]
      })
    }
    if (usage === 'user') {
      const first = Object.values(body[0])
      const second = Object.values(body[1])
      const third = Object.values(body[2])
      mapper = second.map((element, i) => {
          return [element, third[i], first[i]]
      })
    }
    return (
      <div className="table">
        <br></br>
        <br></br>
        <table>
          <thead>
            <tr>
              {head.map((item) => {
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