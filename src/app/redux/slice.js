import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch users with pagination
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users?page=${page}`); // Replace with actual API endpoint
      // Log response to verify the structure
      console.log("API Response:", response);
      return response.json(); // Return the full response data object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // Initialize as an empty array
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalUsers: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("Fulfilled Payload:", action.payload);
        state.status = "succeeded";
        state.users = action.payload.users; // Store the users array
        state.totalPages = action.payload.totalPages; // Store total pages
        state.totalUsers = action.payload.totalUsers; // Store total number of users
        state.currentPage = action.payload.page; // Store the current page
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setPage } = usersSlice.actions;
export default usersSlice.reducer;
