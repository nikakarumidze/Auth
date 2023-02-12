import { createSlice } from '@reduxjs/toolkit';

export interface auth {
  id: string;
  hasToken: boolean;
  token: string;
  date: string;
  name: string;
}

export const initialState: auth = {
  id: '',
  hasToken: false,
  token: '',
  date: '',
  name: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    applyToken: (state: auth, action) => {
      state.hasToken = true;
      state.token = action.payload.token;
      state.date = action.payload.date;
      state.id = action.payload.id;
    },
    logOut: (state: auth) => {
      state.id = '';
      state.hasToken = false;
      state.token = '';
      state.date = '';
      state.name = '';
      localStorage.clear();
    },
  },
});

export const { logOut, applyToken } = authSlice.actions;
