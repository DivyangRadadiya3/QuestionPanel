// questionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchQuestionsBySubjectApi,
  addNewQuestionApi,
  editQuestionApi,
  deleteQuestionApi,
} from './questionsApi'; // Adjust the import based on your file structure

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    subTopics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsBySubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestionsBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.Questions;
        state.subTopics = action.payload.subTopics;
      })
      .addCase(fetchQuestionsBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(editQuestionAPI.fulfilled, (state, action) => {
        const index = state.questions.findIndex(
          (question) => question.id === action.payload.id
        );
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(deleteExistQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (question) => question.id !== action.payload
        );
      });
  },
});

// Async thunk for fetching questions by subject
export const fetchQuestionsBySubject = createAsyncThunk(
  'questions/fetchQuestionsBySubject',
  async ({ token, subjectId, classesId }, { rejectWithValue }) => {
    try {
      return await fetchQuestionsBySubjectApi(token, subjectId, classesId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk for adding a new question
export const addNewQuestion = createAsyncThunk(
  'questions/addNewQuestion',
  async ({ addQuestion, token }, { rejectWithValue }) => {
    try {
      return await addNewQuestionApi(addQuestion, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for editing a question
export const editQuestionAPI = createAsyncThunk(
  'questions/editQuestionAPI',
  async ({ editQuestion, token }, { rejectWithValue }) => {
    try {
      return await editQuestionApi(editQuestion, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for deleting a question
export const deleteExistQuestion = createAsyncThunk(
  'questions/deleteExistQuestion',
  async ({ token, itemToDelete }, { rejectWithValue }) => {
    try {
      return await deleteQuestionApi(token, itemToDelete);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Export the reducer
export default questionsSlice.reducer;