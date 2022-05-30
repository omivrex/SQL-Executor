import {firestore} from "./firebaseIntializer.util"

export const sendGetCollectionReq = (collectionName, returnId) => {
    const collectionData = []
    // console.log(collectionName)
    return new Promise((resolve, reject) => {
        firestore.collection(collectionName).get().then((snapShot)=> {
            snapShot.forEach(doc => {
                returnId?collectionData.push({Data:doc.data(), id:doc.id}):collectionData.push(doc.data())
            });
            resolve(collectionData)
        }).catch (err => {
            reject(err)
        })
    })
}

export const sendSaveQuestionReq = async ({courseName, year, subject, section, questionNumber,...everythingElse}, docId, callback) => {
    console.log(courseName, year, subject, section, questionNumber)
    const collecs = {courseName, year, subject, section, questionNumber}
    let path = `/pastquestions/`
    for (const key in collecs) {
        if (Object.hasOwnProperty.call(collecs, key)) {
            const doc = collecs[key].trim();
            console.log('collecs[key].trim(): ', collecs[key].trim())
            //query db to know if collection already exists
            const query = await firestore.collection(path).where(key, '==', doc).get()
            if (query.empty) {
                console.log(key, doc, query.empty)
                try {
                    await firestore.collection(path).doc(doc).set({[key]: doc})
                } catch (error) {
                    console.log(error)
                    alert(error)   
                }
            } 
            console.log(path, doc, key)
            path+= `${doc}/${doc}/`
        }
    }
    
    try {
        docId? /** if docId exists perform an overite else just add the document id */
            firestore
            .collection('pastquestions').doc(collecs.courseName.trim())
            .collection(collecs.courseName.trim()).doc(collecs.year.trim())
            .collection(collecs.year.trim()).doc(collecs.subject.trim())
            .collection(collecs.subject.trim()).doc(collecs.section.trim())
            .collection(collecs.section.trim()).doc(collecs.questionNumber.trim()).collection(collecs.questionNumber.trim())
            .doc(docId)
            .set(everythingElse).then(() => {
                callback()
                alert("saved question successfully...")
            }):
            firestore
            .collection('pastquestions').doc(collecs.courseName.trim())
            .collection(collecs.courseName.trim()).doc(collecs.year.trim())
            .collection(collecs.year.trim()).doc(collecs.subject.trim())
            .collection(collecs.subject.trim()).doc(collecs.section.trim())
            .collection(collecs.section.trim()).doc(collecs.questionNumber.trim()).collection(collecs.questionNumber.trim())
            .add(everythingElse).then(() => {
                alert("saved question successfully...")
                callback()
            })
    } catch (error) {
        console.log(error)
        alert(error)   
    }
}

export const sendDeleteQuestionReq = ({courseName, year, subject, section, questionNumber}, docId, callback) => {
    try {
        firestore.collection(`/pastquestions/${courseName}/${courseName}/${year}/${year}/${subject}/${subject}/${section}/${section}`).doc(questionNumber).delete().then(()=> {
            docId? /** if docId exists perform an overite else just add the document id */
                firestore
                .collection('pastquestions').doc(courseName)
                .collection(courseName).doc(year)
                .collection(year).doc(subject)
                .collection(subject).doc(section)
                .collection(section).doc(questionNumber).collection(questionNumber)
                .doc(docId)
                .delete().then(() => {
                    callback()
                    alert("Deleted question successfully...")
                }):
                callback()
        })
    } catch (error) {
        console.log(error)
    }
}