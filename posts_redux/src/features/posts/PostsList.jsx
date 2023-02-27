import {useDispatch, useSelector} from 'react-redux'
import { selectAllPosts ,addReactions,getPostError,getPostStatus,fetchPosts} from './postsSlice'; 
import { parseISO, formatDistanceToNow } from 'date-fns';
import { useEffect } from 'react';


const PostsList = () => {
  const dispatch = useDispatch()

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  useEffect(()=>{
    console.log('PostsList')
    if(postStatus === 'idle'){
      dispatch(fetchPosts())
    }
  },[postStatus])

  const getTime= (timestamp) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    return timeAgo;
  }

    const orderedPost = posts.slice().sort((a,b)=> b.date.localeCompare(a.date))

    const renderdPost = orderedPost.map (post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <span style={{fontSize:'11px'}}>by {post.userId ? post.userId : `unknown user`} </span>
            <i style={{fontSize:'10px',color:'gray'}}>{getTime(post.date)}</i>
            <div></div>
            <span style={{cursor:'pointer'}} onClick={() => dispatch(addReactions({postId: post.id,reaction : 'like'}))}> 👍 {post.reactions.like}</span> 
            <span style={{cursor:'pointer'}} onClick={() => dispatch(addReactions({postId: post.id,reaction : 'haha'}))}> 😂 {post.reactions.haha}</span> 
            <span style={{cursor:'pointer'}} onClick={() => dispatch(addReactions({postId: post.id,reaction : 'heart'}))}> 💜 {post.reactions.heart}</span> 
            <hr/>
        </article>
        ));
  return (
    <div>
    <h2 style={{color:'navy'}}>Posts</h2>
     {      postStatus === 'loading' ? <h1>Loding...</h1> :  renderdPost}
    </div>
  )
}

export default PostsList
