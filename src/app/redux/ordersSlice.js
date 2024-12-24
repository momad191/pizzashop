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

// Async thunk to fetch orders with pagination
export const fetchDelivered = createAsyncThunk(
  "orders/fetchDelivered",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/orders/delivered?page=${page}`);
      console.log("API Response:", response);
      return response.json(); // Return the full response data object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to fetch orders with pagination
export const fetchProcessing = createAsyncThunk(
  "orders/fetchProcessing",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/orders/processing?page=${page}`);
      console.log("API Response:", response);
      return response.json(); // Return the full response data object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to update the order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, newStatus }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order status");
      }

      const data = await response.json();
      return { orderId, newStatus };
    } catch (error) {
      return rejectWithValue(error.message);
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
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, newStatus } = action.payload;
        const order = state.orders.find((order) => order._id === orderId);
        if (order) {
          order.status = newStatus;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDelivered.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDelivered.fulfilled, (state, action) => {
        console.log("Fulfilled Payload:", action.payload);
        state.status = "succeeded";
        state.orders = action.payload.orders; // Store the orders array
        state.totalPages = action.payload.totalPages; // Store total pages
        state.totalOrders = action.payload.totalOrders; // Store total number of orders
        state.currentPage = action.payload.page; // Store the current page
      })
      .addCase(fetchDelivered.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProcessing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProcessing.fulfilled, (state, action) => {
        console.log("Fulfilled Payload:", action.payload);
        state.status = "succeeded";
        state.orders = action.payload.orders; // Store the orders array
        state.totalPages = action.payload.totalPages; // Store total pages
        state.totalOrders = action.payload.totalOrders; // Store total number of orders
        state.currentPage = action.payload.page; // Store the current page
      })
      .addCase(fetchProcessing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setPage } = ordersSlice.actions;

export default ordersSlice.reducer;
