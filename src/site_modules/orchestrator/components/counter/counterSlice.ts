import { AccessConfig } from './models/AccessConfig';
import { environment } from "../core/environment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../../store";
import { Fitch, JsonObject } from "@fiizy/fitch";

// State definition
interface CounterState {
  counter: number;
  accessConfig?: AccessConfig | null;
}

// Initial state
const initialState: CounterState = {
  counter: 0,
  accessConfig: null
};

// Slice Definition
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
    setConfig: (state, action: PayloadAction<AccessConfig>) => {
      state.accessConfig = action.payload;
    }
  },
});

// export reducers
export const { increment, decrement, incrementByAmount, setConfig } = counterSlice.actions;

export class Slice {
  private static accessToken: string = '';

  private static apiService: Fitch = new Fitch({
    baseURL: environment.apiEndpoint,
    transformRequest: [Slice.authHeader],
    headers: { 'accept-encoding': 'gzip' }
  });

  private static authHeader(request: JsonObject): any {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${Slice.accessToken}`,
    };
    return request;
  }

  // static member function as thunk action
  public static incrementAsync(amount: number, token: string): AppThunk {
    return (dispatch) => {
      Slice.accessToken = token;
      Slice.apiService.get<AccessConfig>('/api/access/get_config/test_config').then((data: AccessConfig)=> {
        console.log(data);
        dispatch(incrementByAmount(amount * 2));
        dispatch(setConfig(data));
      }, () => {
        console.log('rejected');
        dispatch(incrementByAmount(amount));
      });
    }
  }
};

export const selectCount = (state: RootState) => state.counter.counter;

export const CounterSlice = counterSlice.reducer;
