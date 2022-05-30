import {auth} from './firebaseIntializer.util'

function sendLoginReq (email, password) {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password).then(userCredentials=> {
           resolve(userCredentials.user.emailVerified)
           return userCredentials.user.emailVerified
        }).catch(err=> {
            reject(err)
        })
    })
}

export default sendLoginReq