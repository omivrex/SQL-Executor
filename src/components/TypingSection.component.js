import {useRef, useEffect, useState} from 'react'
import componentStyles from "../styles/TypingSection.styles.css"
import { queryResults } from '../results';
const TypingSection = () => {
    const commandSection = useRef()

    const [tableData, settableData] = useState([]) //this is a 2D array

    function extractData(csvText) {
        var rowData = csvText.split(/\r\n|\n/);
        const tempArr = []
        rowData.forEach(element => {
            tempArr.push(element.split(','))
        });
        settableData([... tempArr])
    }

    useEffect(() => {
        (() => {
            extractData(queryResults[0])
        })()
    }, [])
    
    return (
        <>
            <div id="container">
                <div id="textPanelContainer">
                    <span style ={{color:'#eee'}}>Commands:</span>
                    <textarea ref={commandSection} id="commandSection"/>

                    <div id="typingButnWrapper">
                        <div>
                            <div id="runButn">
                                <button type="submit">RUN</button>
                            </div>
                            <div id="saveButn">
                                <button type="submit">SAVE</button>
                            </div>
                        </div>
                    </div>

                    <span style ={{color:'#eee'}}>Result:</span>
                    <div id="resultSection">
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