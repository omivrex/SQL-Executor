import { useEffect, useState, useRef } from 'react';
import TypingSection from './TypingSection.component'
import folderIcon from '../assets/folderIcon.png'
import deleteIcon from '../assets/deleteIcon.png'
import {sendGetCollectionReq} from "../utils/pastQuestions.util"

const PastQuestion = ({closeButn}) => {
    const [collectionData, setcollectionData] = useState([])
    const [editBox, seteditBox] = useState()
    const path = useRef('pastquestions')
    const [pathDisplayed, setpathDisplayed] = useState('pastquestions')
    const [loadingBanner, setloadingBanner] = useState()

    useEffect(() => {
        getCollection(path.current)
    }, [])

    const showLoadingComponent = shouldShow => {
        shouldShow?setloadingBanner(
            <div id="loading">
                <span>
                    Loading....
                </span>
            </div>
        ):
        setloadingBanner()
    }
  
    const getCollection = collectionName => {
        showLoadingComponent(true)
        sendGetCollectionReq(collectionName).then(returnedArray => {
            setcollectionData([... returnedArray])
            showLoadingComponent(false)

        })
    }

    const back = () => {
        let newPath = [...path.current.split('/')]
        let newPathDisplayed = [... pathDisplayed.split('>')]
        if (newPath.length > 1) {
            newPath.pop()
            newPath.pop()
            newPathDisplayed.pop()
            newPathDisplayed = newPathDisplayed.toString().replaceAll(',', '>')
            path.current = newPath.toString().replaceAll(',', '/')
            setpathDisplayed(newPathDisplayed)
            getCollection(path.current)
        }
    }

    const deleteCollection = () => {
        console.log(path)
    }

    const displayEditBox = (params) => {
        let pathData = pathDisplayed.split(' > ')
        if (params) {
            showLoadingComponent(true)
            const dataPath = path.current + `/${params}/${params}` 
            pathData.push(params)
            sendGetCollectionReq(dataPath, true).then(([returnedObject]) =>{
                seteditBox(<TypingSection showLoadingComponent={showLoadingComponent} path={pathData} type={'data'} data={returnedObject.Data} docId={returnedObject.id} closeEditBox={closeEditBox}/>)
                showLoadingComponent(false)
            })
        } else {
            seteditBox(<TypingSection showLoadingComponent={showLoadingComponent} path={pathData} type={'path'} closeEditBox={closeEditBox}/>)
        }
    }

    const closeEditBox = () => {
        seteditBox()
        getCollection(path.current)
    }

  return (
    <>
        <section id="typingSection">
            {closeButn}
            <div id="pathContainer">
                <div id="path">
                    <div>Path:</div>
                    <div id="pathValue">{pathDisplayed}</div>
                </div>
            </div>
            <div id="folderDisplayPannel">
                <span onClick={back} id="backButn">
                    <img src="data:image/png;base64,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"/>
                </span>
                <span onClick={()=> {
                    displayEditBox()
                }} id="addButn">+</span>
                {/* <span onClick={deleteCollection} id="deleteButn">
                    <img src={deleteIcon} />
                </span> */}
                {collectionData.map((dataObj, index) => {
                    const data = Object.values(dataObj)[0]
                    if (Object.keys(dataObj)[0] === 'questionNumber' || Object.keys(dataObj)[0] === 'Data') {
                        return (
                            <div onClick={()=>{displayEditBox(data, 'data')}} className="folder" key={index}>
                                <img src={folderIcon}/>
                                <span className="documentName">{dataObj.questionNumber}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div onClick={()=> {
                                setpathDisplayed(`${pathDisplayed} > ${data}`)
                                path.current += `/${data}/${data}`
                                getCollection(path.current)
                            }} className="folder" key={index}>
                                <img src={folderIcon}/>
                                <span className="documentName">{data}</span>
                            </div>
                        )
                    }
                })}
            </div>
        </section>
        {editBox}
        {loadingBanner}
    </>
  )
}

export default PastQuestion