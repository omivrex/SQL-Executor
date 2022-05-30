import {sendGetCollectionReq} from "./pastQuestions.util"

const pqData = []

let rootPath = 'pastquestions'
export const updateQuestions = () => {
    sendGetCollectionReq(rootPath).then(collectionData => {
        collectionData.forEach(data => {
            let [label] = Object.keys(data)
            pqData.push(data)
            let currentPath = rootPath+`/${data[label]}/${data[label]}`
            getSubCollections(currentPath, data)
        });
    })
}

const getSubCollections = (path, parentObj) => {
    sendGetCollectionReq(path).then((data) =>{
        parentObj.content = data
        parentObj.content.forEach(item => {
            let [label] = Object.keys(item)
            let itemDataPath = path + `/${item[label]}/${item[label]}`
            label === 'questionNumber'?getQuestionData(item, itemDataPath):
            getSubCollections(itemDataPath, item)
        });
    })
}

let noOfQuestions = 0
const getQuestionData = (questionObj, path) => {
    sendGetCollectionReq(path, true).then(([questionData]) => {
        questionObj.content = questionData
    }).then(()=> {
        noOfQuestions++
        console.log('noOfQuestions', noOfQuestions)
        if (noOfQuestions === 800) { /** download create a json file for all question data and download */
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pqData, function replacer(key, value) { return value}));
            const dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "pqData.json");
            dlAnchorElem.click();
        }
    })
}
