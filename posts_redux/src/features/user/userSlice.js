import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id:'0',name:'joe'},
    {id:'1',name:'bob'},
    {id:'2',name:'alice'},
]

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{}
})

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;