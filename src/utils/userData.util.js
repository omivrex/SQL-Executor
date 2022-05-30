import {rtdb} from './firebaseIntializer.util'
let appUsers = {}
const users = rtdb.ref('users')

export const sendGetUserReq = () => {
  return new Promise((resolve, reject) => {
        users.orderByChild('email').once('value', snapshot=> {
            appUsers = {...sortUsersArray(Object.entries(snapshot.val()), 'regDate')}
            resolve(appUsers)
        }).catch(err => {
            reject(err)
        })
    })
}

const sortUsersArray = (array, prop) => {
    array.sort((a, b)=> (b[1])[prop]-(a[1])[prop]) /** the 1st item in each element is the uid while the 2nd is the user data */
    array.forEach((user, index)=> {
      user[1].userId = user[0]
      user[1].index = index+1
      user.shift()
    })
    array = Object.values(array.flat())
    return array
}

export const changeField = (userId, field, event) => {
    if (event.key === 'Enter') {
        if (event.target.value === 'false') {
          users.child(userId).update({[field]: false})
        } else if (event.target.value === 'true') {
          users.child(userId).update({[field]: true})
        } else {
          users.child(userId).update({[field]: event.target.value})
        }
      event.target.blur()
      event.target.style.color = '#e67a06'
      event.target.style.borderColor = '#e67a06'
    }
}

export const searchFunc = (event, appUsers) => {
    const query = event.target.value.toLowerCase()
    .replaceAll(': ', ':')
    .replaceAll(' : ', ':')
    .replaceAll(' :', ':')

    let noOfMatches = 0
    const matches = []
    for (let i = 0; i < appUsers.length; i++) {
        const user = appUsers[i];
        const userStr = JSON.stringify(user).toLowerCase()
        .replaceAll('"', ' ')
        .replaceAll(': ', ':')
        .replaceAll(' : ', ':')
        .replaceAll(' :', ':')
        .replaceAll('vpa', 'paid')
        .replaceAll('regdate')
        .replaceAll('loggedin', 'logged in')
        .replaceAll('dateValidated', 'validation date')
        if (userStr.indexOf(query) !== -1) {
          noOfMatches += 1
          matches.push(user)
        }
    }
    return {noOfMatches, matches}
}

const paymentRequests = rtdb.ref('paymentRequests')
export const sendPaymentRequests = () => {
  return new Promise((resolve, reject) => {
        const paymentReuestData = []
        paymentRequests.once('value', snapshot => { 
            for (const key in snapshot.val()) {
                if (Object.hasOwnProperty.call(snapshot.val(), key)) {
                    paymentReuestData.push({...snapshot.val()[key], userId: key})
                }
            }
            paymentReuestData.sort((a,b)=>b.paymentDate-a.paymentDate)
            resolve(paymentReuestData)
        }).catch(err=>{
            reject(err)
        })
    })
}

export const updatePin = (userId, pin) => {
    return new Promise((resolve, reject) => {
        paymentRequests.child(userId).update({currentPin: pin}).then(() => {
            resolve(true)
        }).catch(err=>{
            alert(err)
            reject(err)
        })
    })
}

export const cancelPaymentRequest = (userId, email) => {
    return new Promise((resolve, reject) => {
        paymentRequests.child(userId).remove()
        resolve(true)
    }).catch (err => {
        throw err
    })
}