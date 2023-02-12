import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {postsAdded} from "./postsSlice";
import {selectAllUsers} from '../user/userSlice';

const AddPostForm = () => {
  const users = useSelector(selectAllUsers);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [userId,setUserId] = useState('');
    const dispatch = useDispatch();
    const onSavePost = () => {
        if (title && content && userId) {
            dispatch(postsAdded(title,content,userId));
            setTitle('');
            setContent('');
            setUserId('');
        }
    }

    const userOptions = users.map(
      user => (
        <option key={user.id} value={user.name}>
          {user.name}
        </option>
      )
    )


  return (
    <section>
        <h2  style={{color:'navy'}}>Add a New Post</h2>
        <form>
        <label htmlFor="postTitle">Post Title:  </label>
        <input type="text" 
        name="postTitle" 
        id="postTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="postContent">   Content:   </label>
        <input type="text" 
        name="postContent" 
        id="postContent"
        value={content}
        onChange={(e) => setContent(e.target.value)}/>
        <span> Select User: </span>
        <select value={userId} onChange={e => setUserId(e.target.value)}>
          <option value=""></option>
          {userOptions}
        </select>
        <div> </div>
        <button type='button' disabled={!(userId && title && content)}
        onClick={onSavePost}>Save Post</button>
        </form>
    </section>
  )
}

export default AddPostForm;