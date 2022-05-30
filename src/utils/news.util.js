import {firestore} from "./firebaseIntializer.util"

const newsSection = [
    {
        name: 'General Information',
        data: []
    },

    {
        name: 'Relevant Materials',
        data: []
    }, 

    {
        name: 'Classes And Exam Support',
        data: []
    }, 
]

export function sendGetPostReq() {
    return new Promise((resolve, reject) => {
        for (const section of newsSection) {
            section.data = []
            firestore.collection(section.name).get().then((snapShot)=> {
                snapShot.forEach(doc => {
                    section.data.push({...doc.data(), postId: doc.id})
                });
            }).catch (err => {
                reject(err)
            })
        }
        resolve(newsSection)
    })
}

export const sendSavePostReq = (displayedPost, sectionDisplayed, topic, body) => {
    const Collection = newsSection[sectionDisplayed]
    const displayedPostData = Collection.data[displayedPost]
    if (!displayedPostData) { //if its a new post
        firestore.collection(Collection.name).add({
            Topic: topic,
            Body: body,
        }).then(async () => {
            alert('New Post Succefully Saved!')
        })
    } else {
        console.log(displayedPostData.postId)
        firestore.collection(Collection.name).doc(displayedPostData.postId).update({
            Topic: topic,
            Body: body
        }).then(()=> {
            alert(`sucessfully updated post!`)
        })
    }
}

export const sendDeletePost = (sectionDisplayed, displayedPost) => {
    const Collection = newsSection[sectionDisplayed]
    const displayedPostData = Collection.data[displayedPost]
    console.log(displayedPostData.postId)
    try {
        firestore.collection(Collection.name).doc(displayedPostData.postId).delete()
        .then(() => {
            alert('Succesfully Deleted Post!')
        })
    } catch (error) {
        alert('Failed to reach Database!')
    }
}