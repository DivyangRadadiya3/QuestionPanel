import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubjects, fetchData } from '../../ApiHandler/getSubjectApi';

export const fetchSubjectsAction = createAsyncThunk(
  'subjects/fetchSubjects',
  async ({ token, classesId, page, dataLimit }) => {
    const response = await fetchSubjects(token, classesId, page, dataLimit);
    return response;
  }
);

export const fetchDataAction = createAsyncThunk(
  'subjects/fetchData',
  async ({ token, subject }) => {
    const response = await fetchData(token, subject);
    return response;
  }
);

const subjectSlice = createSlice({
  name: 'subjects',
  initialState: {
    loading: false,
    subjects: [],
    totalQuestions: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload.subjects;
        state.totalQuestions = action.payload.totalQuestions;
      })
      .addCase(fetchSubjectsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDataAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataAction.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload.subjects;
      })
      .addCase(fetchDataAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default subjectSlice.reducer;