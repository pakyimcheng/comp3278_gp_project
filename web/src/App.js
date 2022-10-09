import React, {useEffect, useState} from 'react'

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/test").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  
  return (
    <div>
      {typeof data.members}
      {
        data.members.forEach((item) => {
          return (
            <div>
              <h1>{item}</h1>
            </div>
          )
        })
      }
    </div>
  )
}

export default App