import userSlice from '@features/userSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendURL } from '../url';

axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
axios.defaults.withCredentials = true;

export type addPostRequestData = { content: string; }
export type addPostErrorData = any; // 에러 메세지 어떻게 보낼건지에 따라 바꿈

export const addPost = createAsyncThunk('article/addArticle', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/article', data);
    thunkAPI.dispatch(userSlice.actions./** 내게 보일 post */(response.data.mid));
    return response.data;
  } catch (error: addPostErrorData) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadPost = createAsyncThunk('post/loadPost', async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/post/${data.aid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
