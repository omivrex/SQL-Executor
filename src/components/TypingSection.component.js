import {useRef, useEffect, useState} from 'react'
import componentStyles from "../styles/TypingSection.styles.css"
import { queryResults } from '../results';
const TypingSection = () => {
    const commandSection = useRef()
    const resultSection = useRef()
    const currentResultDisplayedIndex = useRef(0)
    const [tableData, settableData] = useState([]) //this is a 2D array
    useEffect(() => {
        (() => {
            extractData(queryResults[0])
        })()
    }, [])

    function extractData(csvText) {
        const rowData = csvText.split(/\r\n|\n/);
        const tempArr = []
        rowData.forEach(element => {
            tempArr.push(element.split(','))
        });
        settableData([... tempArr])
        resultSection.current.scrollIntoView()
    }


    const generateResult = () => {
      if (commandSection.current.value.length) {
        const resultToDisplay = Math.round(Math.random()*queryResults.length)
        const randomResult = queryResults[resultToDisplay]
        currentResultDisplayedIndex.current = resultToDisplay
        extractData(randomResult)
      } else {
        alert('Comand Section Is Empty!!')
      }
    }

    const saveQuery = () => {
        if (commandSection.current.value.length) {
            const command = commandSection.current.value
            localStorage.setItem(`query-${new Date().getTime()}`, JSON.stringify({command, result: currentResultDisplayedIndex.current }))
            alert('Successfully Saved Query To Local Storage')
        } else {
            alert('Comand Section Is Empty!!')
        }
    }
    
    return (
        <>
            <div id="container">
                <div id="textPanelContainer">
                    <span style ={{color:'#eee'}}>Commands:</span>
                    <textarea ref={commandSection} id="commandSection"/>

                    <div id="typingButnWrapper">
                        <div>
                            <div id="runButn">
                                <button type="submit" onClick={generateResult}>RUN</button>
                            </div>
                            <div id="saveButn">
                                <button type="submit" onClick={saveQuery}>SAVE</button>
                            </div>
                        </div>
                    </div>

                    <span style ={{color:'#eee'}}>Result:</span>
                    <div ref={resultSection} id="resultSection">
                        <table>
                            <tbody>
                                {tableData.map((row, rowIndex) => {
                                    return (
                                        <tr key={rowIndex.toString()}>
                                            {row.map((cell, cellIndex) => {
                                                return <td key={cellIndex.toString()}>{cell}</td>
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TypingSection