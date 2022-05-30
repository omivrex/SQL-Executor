import {useState, useEffect} from 'react'
import pageStyles from "../styles/userData.styles.css"
import {changeField, searchFunc, updatePin, cancelPaymentRequest} from "../utils/userData.util"

const UserDataComponent = ({headerName, appUsers, paymentData, closeButn, shouldDisplaySearchBar}) => {
    const [Records, setRecords] = useState()
    const recordsData = !paymentData?Object.values({...appUsers}):Object.values({...paymentData})
    useEffect(() => {
        setRecordsData()
    }, [])
    
    const setRecordsData = ()=> {
        setRecords(recordsData)
        // setalertComponent() /** this is to just initiate a re render */
    }
  
  const [headerNameState, setheaderNameState] = useState(headerName)
  const [alertComponent, setalertComponent] = useState()

  const generatePin = (userId) => {
    let pin = 'L'
    for (let i = 0; i < 15; i++) {
        pin += `${Math.ceil(Math.random()*10)}`
    }
    pin = pin.slice(0, 15) // to ensure pin always have 14 digits
    updatePin(userId, pin).then(() => setalertComponent(
        <>
            <div id="alertCont">
                USER'S PIN IS {pin}
                <span onClick={
                    ()=> {
                        document.body.focus()
                        navigator.clipboard.writeText(pin)
                        .then(()=> {
                            alert('Pin Copied You Can Now Send to User');
                            setalertComponent()
                        })
                    }}>COPY</span>
                <span onClick={()=> setalertComponent()}>CANCEL</span>
            </div>
        </>
    ))
  }
  return (
    <div className="dataBlock" id="dataBlock">
        <div className="DATA_BLOCK_HEADER">
            {closeButn}
            <span id="headerName">{headerNameState}</span>
            {shouldDisplaySearchBar? <input id="searchInput" onInput={event=>{
                const {noOfMatches, matches} = searchFunc(event, appUsers)
                if (event.target.value === '') {
                    setRecords(!paymentData?[...appUsers]:[...paymentData])
                    setheaderNameState(headerName)
                } else {
                    setRecords([...matches])
                    setheaderNameState(`${noOfMatches} MATCHES`)
                }
            }} type="text" placeholder="Search e.g. futo"/>:''}
        </div>
        <div id="dataReqTable">
            {!Records? <h3 style = {{marging: 'auto', width: '100%', fontFamily: 'sans-serif', textAlign: 'center'}}>Loading...</h3>:
                Records.map((user, index) => {
                    let regDate = new Date(user.regDate).toDateString()
                    let formattedDate = user.paymentDate?new Date(user.paymentDate).toDateString():new Date(user.dateValidated).toDateString()
                    return (
                        <div key={user.userId}>
                            <span className="userIndex">User {(Records.length - index)}</span>
                            {!paymentData?
                                (<>
                                    <span>Email:<input onKeyDown={event=>changeField(user.userId, 'email', event)} type="text" defaultValue={user.email}/></span>
                                    <span>School:<input onKeyDown={event=>changeField(user.userId, 'school', event)} type="text" defaultValue={user.school}/></span>
                                    <span>Phone:<input onKeyDown={event=>changeField(user.userId, 'phone', event)} type="text" defaultValue={user.phone}/></span>
                                    <span>Paid:<input onKeyDown={event=>changeField(user.userId, 'vpa', event)} type="text" defaultValue={user.vpa}/></span>
                                    <span>Reg Date: {regDate}</span>
                                    <span>Validation Date: {(formattedDate!=='Invalid Date')? formattedDate : `user hasn't been validated`}</span>
                                    <span>Logged In: <input onKeyDown={event=>changeField(user.userId, 'loggedIn', event)} type="text" defaultValue={user.loggedIn}/></span>
                                </>):
                                (<>
                                    <span className="cancelPaymenReqButn" onClick={
                                        () => {
                                            cancelPaymentRequest(user.userId, user.email).then(successful=> {
                                                if (successful) {
                                                    alert(`Payment request successfully canceled for ${user.email} !`)
                                                    paymentData.splice(index, 1)
                                                    setRecords(Records)
                                                    console.log(paymentData)
                                                }
                                            })
                                        }
                                    }>x</span>
                                    <span>Email: {user.email}</span>
                                    <span>Acc. Name: {user.acc_name}</span>
                                    <span>Phone: {user.phone}</span>
                                    <span>Acc. Name: {user.acc_name}</span>
                                    <span>Payment Date: {formattedDate || 'NIL'}</span>
                                    <div onClick = {()=>generatePin(user.userId)}>
                                        <span>GENERATE PIN</span>
                                    </div>
                                </>)
                            }
                        </div>
                    )
                })
            }
        </div>
        {alertComponent}
    </div>
  )
}

export default UserDataComponent