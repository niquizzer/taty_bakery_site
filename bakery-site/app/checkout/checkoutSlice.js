import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addItem = createAsyncThunk(
  "cart/create",
  async ({ name, quantity, price }) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/add-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, quantity, price }),
    });
    return await res.json();
  }
);
export const removeItem = createAsyncThunk("cart/delete", async ({ name }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return await res.json();
});
export const loadCheckout = createAsyncThunk("cart/get", async () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/load-checkout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log("Load checkout data successful");
  return data;
});
export const adjustCartAmount = createAsyncThunk(
  "cart/update",
  async ({ name, adjustment }) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/update-item`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, adjustment }),
    });
    const data = await res.json();
    console.log("Update checkout data successful");
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //addItem
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error; // Remove .loading
      })
      //loadItems
      .addCase(loadCheckout.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      //removeItem
      .addCase(removeItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Update cart with new state from server
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      //adjustCartAmount
      .addCase(adjustCartAmount.pending, (state) => {
        state.loading = true;
      })
      .addCase(adjustCartAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Update cart with new state from server
      })
      .addCase(adjustCartAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

// Bottom exports should include removeItem
export { addItem, removeItem, loadCheckout, adjustCartAmount };
export default cartSlice.reducer;
