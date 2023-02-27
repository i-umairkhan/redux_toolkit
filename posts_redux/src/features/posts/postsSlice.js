import {createSlice,nanoid,createAsyncThunk} from "@reduxjs/toolkit";
import {sub} from 'date-fns'
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts:[],
    status : 'idle',
    error : null
}

export const fetchPosts = createAsyncThunk('post/fetchPosts',async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
})

const postsSlice = createSlice({
    name : "posts",
    initialState,
    reducers:{
        postsAdded: {
            reducer (state,action) {
            state.posts.push(action.payload);
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
        const exsistingPost = state.posts.find(post => post.id == postId);
        if(exsistingPost){
            exsistingPost.reactions[reaction]++;
        }}
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending,(state,action) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled,(state,action) => {
            state.status = 'succeeded';
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                post.reactions = {
                    like : '0',
                    haha : '0',
                    heart : '0',
                }
                return post;
        })
        // state.posts = state.posts.concat(loadedPosts)
        state.posts = (loadedPosts)
    })
    .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const {postsAdded,addReactions} = postsSlice.actions;

export default postsSlice.reducer