import { NamespaceSlice } from './components/core/NamespaceSelector.reducer';
import { CounterSlice as CounterSlice1 } from './components/counter/counterSlice';

import Core from './components/core/Core';
import { MenuItem } from '../../models/MenuItem';
export { routes } from './components/core/routes';

export const ReducerMap = {
    counter: CounterSlice1,
    namespace: NamespaceSlice
};

export const ProfileSections: Array<MenuItem> = [
];

export const Orchestrator = Core;

export default Orchestrator;