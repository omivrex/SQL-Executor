import { useEffect, useState } from "react"
import styles from "../styles/savedQueries.style.css"
const SavedQueries = ({extraClass, savedQueries}) => {
    
  return (
    <div id='savedQryBox' className={extraClass}>
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