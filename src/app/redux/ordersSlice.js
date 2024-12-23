import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch orders with pagination
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/orders?page=${page}`);
      console.log("API Response:", response);
      return response.json(); // Return the full response data object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // Initialize as an empty array
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalOrders: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        console.log("Fulfilled Payload:", action.payload);
        state.status = "succeeded";
        state.orders = action.payload.orders; // Store the orders array
        state.totalPages = action.payload.totalPages; // Store total pages
        state.totalOrders = action.payload.totalOrders; // Store total number of orders
        state.currentPage = action.payload.page; // Store the current page
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setPage } = ordersSlice.actions;
export default ordersSlice.reducer;
