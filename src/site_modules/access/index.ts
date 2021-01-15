import { RequestAccessSlice } from './components/request_access/RequestAccessSlice';
import { CounterSlice as CounterSlice1 } from './components/counter/counterSlice';
import { CounterSlice as CounterSlice2 } from './components/counter2/counterSlice';
import { AccessOverviewSlice } from './components/access_overview/AccessOverviewSlice';

export { Core as Access } from './components/core/Core';
export { routes } from './components/core/routes';

export const ReducerMap = {
    counter: CounterSlice1,
    counter2: CounterSlice2,
    requestAccess: RequestAccessSlice,
    accessOverview: AccessOverviewSlice
};
