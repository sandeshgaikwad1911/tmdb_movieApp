import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: {},
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers:{
        // methods are called 'actions' in reducers
        getApiConfiguration: (state, action)=>{
            state.url = action.payload
        }
    }
})

export const { getApiConfiguration, getGenres} = homeSlice.actions

export default homeSlice.reducer


/* 
    name: 'home',   =>    it's just name nowhere is used

*/