import { useEffect, useState } from "react"
import styles from "../styles/savedQueries.style.css"
const SavedQueries = ({extraClass, savedQueries, viewQuery}) => {
    
  return (
    <div id='savedQryBox' className={extraClass}>
        <h3>Saved Queries</h3>
        <ul id="queriesWrapper">
            {savedQueries.map(({command, result}, index) => {
                return <li onClick={()=> viewQuery(result, command)} key={index.toString()}>{command.slice(0, 20)}...</li>
            })}
        </ul>
    </div>
  )
}

export default SavedQueries