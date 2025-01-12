import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        isSignedIn: false,
        userData: null,
        searchInput: "tech",
        blogData: null,
    }

//slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSignedIn: (state, action) => {
            state.isSignedIn = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setBlogData: (state, action) => {
            state.blogData = action.payload;
        },
    },

});

//selectors
export const selectSignedIn = (state) => state.user.isSignedIn;
export const selectUserData = (state) => state.user.userData;
export const selectUserInput = (state) => state.user.searchInput;
export const selectBlogData = (state) => state.user.blogData;

//actions
export const { 
    setSignedIn, 
    setUserData, 
    setInput, 
    setBlogData, 
} = userSlice.actions;

//userReducer
export default userSlice.reducer;


