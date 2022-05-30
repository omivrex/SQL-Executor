import styles from "../styles/NavBar.styles.css"

const NavBar = ({addExtraClass}) => {
  return (
    <div id="navBar">
        <div id="appName">
            <span style={{padding: '1rem'}}>Rex SQL Executor</span>
        </div>
        <div id="navButn" onClick={()=> addExtraClass()}>
            <span className="burgerNav"></span>
            <span className="burgerNav"></span>
            <span className="burgerNav"></span>
        </div>
    </div>
  )
}


export default NavBar