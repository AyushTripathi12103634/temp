import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
    name: 'mode',
    initialState: false, // Set your initial mode value (true or false)
    reducers: {
        setMode: (state, action) => {
            return action.payload; // Update the mode based on the payload (true or false)
        }
    },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;