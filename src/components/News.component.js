import {useEffect, useState, useRef} from "react"
import {sendGetPostReq, sendSavePostReq, sendDeletePost} from "../utils/news.util"
import pageStyles from "../styles/News.styles.css"

let newsSection = []
let sectionDisplayed = 0
let displayedPost = 0
const News = ({closeButn}) => {
    const [headlines, setheadlines] = useState()
    const [Post, setPost] = useState()
    const topicRef = useRef()
    const bodyRef = useRef()
    const displayValue = useRef('none')
    
    useEffect(() => {
      getPosts()
    }, [])

    const getPosts = () => {
        sendGetPostReq().then(returnedArray => {
            newsSection = [... returnedArray]
            displayHeadlines(sectionDisplayed)
        })
    }

    const displayHeadlines = (sectionId) => {
        setheadlines(
            <>
                {newsSection[sectionId].data.map((post, index) => {
                    return (
                        <div className="headline" key={index} onClick={()=> displayPost(index)}>
                            {post.Topic || post.Title}   
                        </div>
                    )
                })}
            </>
        )
        sectionDisplayed = sectionId
    }

    const displayPost = (postIndex) => {
        displayedPost = postIndex
        console.log(newsSection[sectionDisplayed].data[displayedPost])
        setPost()
        setTimeout(() => { /** using a timeout to enable the previous setPost() to run before the on ebelow in other to ensure the post is refreshed */
            displayValue.current = 'flex'
            setPost(
                <>
                    <input type="text" id="topic" ref={topicRef} readOnly={true}  defaultValue={newsSection[sectionDisplayed].data[postIndex].Topic} placeholder="Topic"/>
                    <textarea name="Body" id="postBody" ref={bodyRef} readOnly={true} defaultValue={newsSection[sectionDisplayed].data[postIndex].Body} cols="30" rows="10"></textarea>
                    <div id="butnContainer">
                        <button onClick={editPost} type="button">Edit</button>
                        <button onClick={savePost} type="button">Save</button>
                        <button onClick={deletePost} type="button">Delete</button>
                    </div>
                </>
            )
        }, 500);
    }

    const editPost = () => {
        topicRef.current.readOnly = false
        bodyRef.current.readOnly = false
    }

    const addPost = () => {
        displayValue.current = 'flex'
        setPost(
            <>
                <input type="text" id="topic" ref={topicRef} readOnly={false}  defaultValue={`New Post`} placeholder="Topic"/>
                <textarea name="Body" id="postBody" ref={bodyRef} readOnly={false} cols="30" rows="10"></textarea>
                <div id="butnContainer">
                    <button onClick={editPost} type="button">Edit</button>
                    <button onClick={savePost} type="button">Save</button>
                    <button onClick={deletePost} type="button">Delete</button>
                </div>
            </>
        )
        displayedPost = -1 // this is because the displayed post is not part of the section displayed
    }

    const savePost = () => {
      sendSavePostReq(displayedPost, sectionDisplayed, topicRef.current.value, bodyRef.current.value)
    }

    const deletePost = () => {
        sendDeletePost(sectionDisplayed, displayedPost)
        setPost()
        getPosts()
    }

  return (
    <>
        <section id="section">
            {closeButn}
            <div id="headNameCont">
                <div id="header">Sections:</div>
                <span onClick={()=>displayHeadlines(0)}>General Information</span>
                <span onClick={()=>displayHeadlines(1)}>Relevant Materials</span>
                <span onClick={()=>displayHeadlines(2)}>Classes And Exams</span>
            </div>
            <div id="headlineContainer">
                <div>
                    News:
                    <span id="addNews" onClick={addPost} className="addButn">+</span>
                </div>

                <div id="headlines">
                    {headlines}
                </div>
            </div>
        </section>
        <div style={{display: displayValue.current}} id="post">
            <span className="close newsSectionCloseButn" onClick={()=> {
                displayValue.current = 'none'
                setPost()
            }}>x</span>
            {Post}
        </div>
    </>
  )
}

export default News