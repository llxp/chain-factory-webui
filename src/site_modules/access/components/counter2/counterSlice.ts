import { environment } from "../core/environment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../../store";
import { Fitch, JsonObject } from "@fiizy/fitch";

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFkbWluaXN0cmF0b3JAZHdzLmxvY2FsIiwicGFzc3dvcmQiOiJZaTFzZUBpXmgwIiwiZXhwIjoxNjA3NDE5NTcwLjYwNTM0fQ.ZAswKUWQpqAJAUZRiZspOrzvHXEltKMpgmsR7dP9neE';


function authHeader(request: JsonObject): any {
  //console.log(store.getState().signin.token);
  //console.log(selectToken);
  request.headers = {
    ...request.headers,
    Authorization: `Bearer ${accessToken}`,
  };
  return request;
}

interface CounterState {
  token: string;
  value: number;
}

const initialState: CounterState = {
  token: '',
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter2",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): AppThunk => () => {
  /*apiService.get('/api/access/get_config/test_config').then((data)=> {
    console.log(data);
    dispatch(incrementByAmount(amount * 2));
  }, () => {
    console.log('rejected2');
    dispatch(incrementByAmount(amount));
  });*/
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter2.value)`
export const selectCount = (state: RootState) => state.counter2.value;

export const CounterSlice = counterSlice.reducer;
