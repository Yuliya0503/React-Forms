import { createSlice } from '@reduxjs/toolkit';
interface FormState {
  formData: {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    acceptTerms: boolean;
    picture: string;
  }
}
const initialState: FormState = {
  formData: {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptTerms: false,
    picture: '', 
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    setImageData: (state, action) => {
      state.formData.picture = action.payload;
    }
  },
});

export const { setFormData, setImageData } = formSlice.actions;
export default formSlice.reducer;
