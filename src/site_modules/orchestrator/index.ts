import { CounterSlice as CounterSlice1 } from './components/counter/counterSlice';

export { Core as Orchestrator } from './components/core/Core';
export { routes } from './components/core/routes';

export const ReducerMap = {
    counter: CounterSlice1,
};
