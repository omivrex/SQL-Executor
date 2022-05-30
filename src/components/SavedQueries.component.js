import { useEffect, useState } from "react"
import styles from "../styles/savedQueries.style.css"
const SavedQueries = () => {
    const [savedQueries, setsavedQueries] = useState([])
    useEffect(() => {
        const tempArr = []
        for (const key in localStorage) {
            if (Object.hasOwnProperty.call(localStorage, key) && key.includes('query-')) {
                const query = localStorage[key];
                tempArr.push(JSON.parse(query))
                console.log(query)
            }
        }
        setsavedQueries([... tempArr])
    }, [])
    

  return (
    <div id='savedQryBox'>
        <h3>Saved Queries</h3>
        <ul id="queriesWrapper">
            {savedQueries.map((query, index) => {
                return <li key={index.toString()}>{query.command.slice(0, 20)}...</li>
            })}
        </ul>
    </div>
  )
}

export default SavedQueries