import styles from "../styles/savedQueries.style.css"
const SavedQueries = ({extraClass, savedQueries, viewQuery, deleteQuery}) => {
    
  return (
    <div id='savedQryBox' className={extraClass}>
        <h3>Saved Queries</h3>
        <ul id="queriesWrapper">
            {savedQueries.map(({command, result}, index) => {
                return <li key={index.toString()}>
                    <span onClick={()=> viewQuery(result, command)}>{command.slice(0, 20)}...</span>
                    <span onClick={()=> deleteQuery(index)} title="delete">x</span>
                </li>
            })}
        </ul>
    </div>
  )
}

export default SavedQueries