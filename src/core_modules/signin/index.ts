import { ProfileSlice } from './components/profile/ProfileSlice';
import { SignInSlice } from '../signin/components/signin/SignInSlice';

export { CoreComponent as SignIn } from './components/core/Core';
export { routes } from './components/core/routes';

export const ReducerMap = {
  signin: SignInSlice,
  profile: ProfileSlice
};
