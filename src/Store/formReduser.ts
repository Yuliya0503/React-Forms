import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../models/constants';


const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    setImageData: (state, action) => {
      state.formData.picture = action.payload;
    },
  },
});

export const { setFormData, setImageData } = formSlice.actions;
export default formSlice.reducer;
