import {createSlice,nanoid} from "@reduxjs/toolkit";
import {sub} from 'date-fns'

const initialState = [
    {id:'1' , title: "Sports" , content : "Pakistan won world cup" ,
    date: sub(new Date(), {minutes :10 }).toISOString(),
    reactions:{
        like : '0',
        haha : '0',
        heart : '0',
    }
},
    {id:'2' , title: "Weather" , content : "Snow fall in chakwal" ,
    date: sub(new Date(), {minutes :5 }).toISOString() ,
    reactions:{
        like : '0',
        haha : '0',
        heart : '0',
    }
}
]

const postsSlice = createSlice({
    name : "posts",
    initialState,
    reducers:{
        postsAdded: {
            reducer (state,action) {
            state.push(action.payload);
        },
        prepare(title,content,userId){
            return{
                payload:{
                    id:nanoid(),
                    title,
                    content,
                    date: new Date().toISOString(),
                    userId,
                    reactions:{
                        like : '0',
                        haha : '0',
                        heart : '0',
                    }
                }
            }
        }
    
    },
    addReactions (state,action){
        const {postId, reaction} = action.payload;
        const exsistingPost = state.find(post => post.id == postId);
        if(exsistingPost){
            exsistingPost.reactions[reaction]++;
        }}
    }
})

export const selectAllPosts = (state) => state.posts;

export const {postsAdded,addReactions} = postsSlice.actions;

export default postsSlice.reducer