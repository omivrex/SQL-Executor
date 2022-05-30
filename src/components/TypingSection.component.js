import {useRef, useEffect, useState} from 'react'
import componentStyles from "../styles/TypingSection.styles.css"
import addImageIcon from "../assets/addImageIcon.png"
import { sendSaveQuestionReq, sendDeleteQuestionReq } from '../utils/pastQuestions.util';

const VanillaCaret = require('vanilla-caret-js');

const TypingSection = ({path, data, docId, closeEditBox, showLoadingComponent}) => {
    const questionSection = useRef()
    const answerSection = useRef()
    const activeSection = useRef(questionSection.current)
    const imageUploadButn = useRef() 
    const bold = useRef(false)
    const underline = useRef(false)
    const italic = useRef(false)

    // useEffect(() => {
    //     (() => {
    //         if (data) {
    //             questionSection.current.innerHTML = data.Data.question
    //             answerSection.current.innerHTML = data.Data.answer
    //             if (section.current === 'Objective') {
    //                 correctOption.current = data.Data.correctOption
    //                 displayCorrectOption(true)
    //             }
    //         } else if (section.current === 'Objective') {
    //             displayCorrectOption(true)
    //         }
    //         latexCodes.current = {
    //             questionLatex: [],
    //             answerLatex: []
    //         }
    //         getAllLatexCodes()
    //         getLatexHTMLData()
    //         console.log(latexCodes.current)
    //     })()
    // }, [])
    
    const formatText = (ref, command, tag)=>{
        const activeSectionId = activeSection.current.id
        const lastDivWithImg = document.querySelector(`#${activeSectionId}>.divWithImage:last-of-type`)
        activeSection.current.focus();
        if (ref.current === true) {
            document.getElementById(command).style.boxShadow = '0 0 4px 0 #323131'
            document.querySelector(`#${activeSectionId}>.${tag}_text:last-of-type`).parentElement.innerHTML += `<span>&nbsp;</span>`
            new VanillaCaret(document.querySelector(`#${activeSectionId}>.${tag}_text:last-of-type`).parentElement).setPos(document.querySelector(`#${activeSectionId}>.${tag}_text:last-of-type`).parentElement.innerText.length)
        } else {
            lastDivWithImg?lastDivWithImg.innerHTML += `<${tag} class="${tag}_text">&nbsp;</${tag}>`
            :activeSection.current.innerHTML += `<${tag} class="${tag}_text">&nbsp;</${tag}>`
            document.getElementById(command).style.boxShadow = 'none'
            lastDivWithImg? new VanillaCaret(lastDivWithImg.lastElementChild).setPos(lastDivWithImg.lastElementChild.innerText.length): new VanillaCaret(document.querySelector(`#${activeSectionId}>.${tag}_text:last-of-type`)).setPos(document.querySelector(`#${activeSectionId}>.${tag}_text:last-of-type`).innerText.length)
        }
        ref.current = !ref.current
    }

    // const saveQuestion = () => {
    //     if (courseName.current !== '' && year.current !== '' && subject.current !== '' && questionNumber.current !== '') {
    //         if (correctOption.current === '' && section.current === 'Objective') {
    //             alert("You haven't typed the correct answer to this question")
    //         } else {
    //             latexCodes.current.questionLatex.forEach(data => {
    //                 if (data.htmlCode && data.latexCode) {
    //                     questionSection.current.innerHTML = questionSection.current.innerHTML.replaceAll(data.htmlCode, data.latexCode)
    //                 }
    //                 console.log(data)
    //             });
    //             latexCodes.current.answerLatex.forEach(data => {
    //                 if (data.htmlCode && data.latexCode) {
    //                     answerSection.current.innerHTML = answerSection.current.innerHTML.replaceAll(data.htmlCode, data.latexCode)
    //                 }
    //                 console.log(data)
    //             });
    //             const questionData =  {
    //                 courseName: courseName.current.toLowerCase(),
    //                 year: year.current.toLowerCase(),
    //                 subject: subject.current.toLowerCase(),
    //                 section: section.current,
    //                 questionNumber: questionNumber.current.toLowerCase(),
    //                 Data: {
    //                     question: questionSection.current.innerHTML,
    //                     answer: answerSection.current.innerHTML,
    //                     correctOption: correctOption.current.toUpperCase(),
    //                 }
    //             }
    //             showLoadingComponent(true)
    //             sendSaveQuestionReq(questionData, docId, ()=>{
    //                 showLoadingComponent(false)
    //                 closeEditBox()
    //             })
    //         }
    //     } else {
    //         alert('Please Fill Question Details...')
    //     }
    // }

    // const  deleteQuesiton = () => {
    //     if (courseName.current !== '' && year.current !== '' && subject.current !== '' && questionNumber.current !== '') {
    //         const questionData =  {
    //             courseName: courseName.current.toLowerCase(),
    //             year: year.current.toLowerCase(),
    //             subject: subject.current.toLowerCase(),
    //             section: section.current,
    //             questionNumber: questionNumber.current.toLowerCase(),
    //         }
    //         showLoadingComponent(true)
    //         sendDeleteQuestionReq(questionData, docId, ()=>{
    //             showLoadingComponent(false)
    //             closeEditBox()
    //         })
    //     } else {
    //         alert('Please Fill Question Details...')
    //     }
    // }

    // const addLatex = () => {
    //     const latexCode = prompt('Enter latex code')
    //     if (latexCode) {
    //         const activeSectionId = activeSection.current.id
    //         const lastDivWithImg = document.querySelector(`#${activeSectionId}>div:last-of-type`)
    //         lastDivWithImg?lastDivWithImg.innerHTML+= `<span class="latexCodes_${activeSectionId}" contentEditable=false>${latexCode}</span><span class="sectionToKeepTyping">&nbsp;</span>`:
    //         activeSection.current.innerHTML+= `<span class="latexCodes_${activeSectionId}" contentEditable=false>${latexCode}</span><span class="sectionToKeepTyping">&nbsp;</span>`
    //         window.MathJax.typeset()
    //         activeSection.current.focus();
    //         const placeToType = document.querySelector('.sectionToKeepTyping:last-of-type')
    //         new VanillaCaret(placeToType).setPos(placeToType.innerText.length)
    //         let lastMathJaxElement = document.querySelectorAll('mjx-container')
    //         lastMathJaxElement = lastMathJaxElement[lastMathJaxElement.length-1]
    //         activeSectionId === 'questionTypingSection'?latexCodes.current.questionLatex.push({latexCode, htmlCode: lastMathJaxElement.outerHTML}):
    //         latexCodes.current.answerLatex.push({latexCode, htmlCode: lastMathJaxElement.outerHTML})
    //         console.log(latexCodes.current)
    //     }
    // }

    return (
        <>
            <div id="container">
                {/* <div id="controlls">
                    <div id="questionAndAnswerDetails">
                        <div>
                            <input className="details" defaultValue={path[1]?path[1]:''} onInput={e=> courseName.current = e.target.value } placeholder="Course Name e.g: Maths" type="text"/>
                            <input className="details" defaultValue={parseInt(path[2]?path[2]:'2019')} onInput={e=> year.current = e.target.value } placeholder="Year e.g: 2019" type="number"/>
                            <input className="details" defaultValue={path[3]?path[3]:''} onInput={e=> subject.current = e.target.value } placeholder="Subject e.g: Applied Mathematics" type="text"/>
                            <div className="details">
                               <label htmlFor="section">Section:</label> 
                                <select value={section.current} onChange={e=> {
                                        section.current = e.target.value
                                        section.current==='Theory'?displayCorrectOption(false) : displayCorrectOption(true, data?data.Data.correctOption:'')
                                    }}>
                                    <option >Theory</option>
                                    <option>Objective</option>
                                </select>
                            </div>
                            <input className="details" defaultValue={path[5]?path[5]:''} onInput={e=> questionNumber.current = e.target.value } placeholder="Question Number e.g: 28" type="text"/>
                        </div>
                    </div>

                    <div id="textformatArea">
                        <span className="formatButns" onClick={()=>{formatText(bold, 'bold', 'b')}} id="bold"><b>B</b></span>
                        <span className="formatButns" onClick={()=>{formatText(italic, 'italic', 'i')}} id="italic"><em>I</em></span>
                        <span className="formatButns" onClick={()=>{formatText(underline, 'underline', 'u')}} id="underline"><u>U</u></span>
                    </div>
                </div> */}

                <div id="textPanelContainer">
                    <span style ={{color:'#eee'}}>Command:</span>
                    <div className="textPanel" onFocus={()=>activeSection.current = questionSection.current}>
                        <textarea ref={questionSection} className="typingSection" id="questionTypingSection"/>
                    </div>

                    <span style ={{color:'#eee'}}>Result:</span>
                    <div className="textPanel" onFocus={()=>activeSection.current = answerSection.current}>
                        <div ref={answerSection} className="typingSection" id="answerTypingSection"></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TypingSection