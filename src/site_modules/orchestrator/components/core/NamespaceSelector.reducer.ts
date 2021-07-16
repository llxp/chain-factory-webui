import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store";

// State definition
interface NamespaceState {
  namespace: string;
}

// Initial state
const initialState: NamespaceState = {
  namespace: "default"
};

// Slice Definition
export const namespaceSlice = createSlice({
  name: "namespace",
  initialState,
  reducers: {
    setNamespace: (state, action: PayloadAction<string>) => {
      //console.log(action.payload);
      state.namespace = action.payload;
    }
  },
});

// export reducers
export const { setNamespace } = namespaceSlice.actions;

export const selectNamespace = (state: RootState) => state.namespace.namespace;

export const NamespaceSlice = namespaceSlice.reducer;
