import {useState, useEffect} from 'react'
import './App.css'
import NavBar from './components/Navbar.component'
import SavedQueries from './components/SavedQueries.component'
import TypingSection from './components/TypingSection.component'

const defaultQuerries = [
  {
    command: 'SELECT * FROM cartegories;',
    result: 0
  },
  {
    command: 'SELECT CustomerName, City FROM Customers;',
    result: 1
  },

  {
    command: `SELECT * FROM Customers
    ORDER BY Country;`,
    result: 3
  },
]

function App() {
  const [extraClass, setextraClass] = useState('')
  const [savedQueries, setsavedQueries] = useState([])
  const [queryData, setqueryData] = useState({queryToView: 0, command: ''})
  

  const addExtraClass = () => {
    extraClass=== 'slideInRight'?setextraClass('slideOutRight'):
    setextraClass('slideInRight')
  }

  const viewQuery = (index, command) => {
    setqueryData({queryToView: index, command: command})
  }

  const getSavedQueries = () => {
    const tempArr = []
    for (const key in localStorage) {
        if (Object.hasOwnProperty.call(localStorage, key) && key.includes('query-')) {
            const query = localStorage[key];
            tempArr.push({... JSON.parse(query), key})
        }
    }
    setsavedQueries([... defaultQuerries, ... tempArr])
  }

  const deleteQuery = (index) => {
    const queryKey = savedQueries[index].key
    if (queryKey) {
      localStorage.removeItem(queryKey)
      alert('Query Successfully Deleted!')
      getSavedQueries()
    } else {
      alert(`This is a default query, it can't be deleted `)
    }
  }

  useEffect(() => {
    getSavedQueries()
  }, [])
  

  return (
    <>
      <NavBar addExtraClass={addExtraClass}/>
      <TypingSection getSavedQueries={getSavedQueries} queryToView={queryData.queryToView} commandToDisplay={queryData.command}/>
      <SavedQueries deleteQuery={deleteQuery} viewQuery={viewQuery} extraClass={extraClass} savedQueries={savedQueries}/>
    </>
  )
}

export default App
