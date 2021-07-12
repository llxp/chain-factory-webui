import { ThunkAction } from "@reduxjs/toolkit";
import { environment } from "../core/environment";
import { RootState, store } from '../../../../store';
import FitchCredentialsWrapper from '../../wrappers/FitchCredentialsWrapper';
import { signOutAsync } from '../../../../core_modules/signin/components/signin/SignInSlice';
import { Namespace } from "./models/Namespace";
import thunkTemplate from "../../../../shared_utils/ThunkTemplate";

const redirectCallback: { (): void } = () => {
  store.dispatch(signOutAsync());
};
const apiService: FitchCredentialsWrapper = new FitchCredentialsWrapper(environment.apiEndpoint, redirectCallback);

export function getNamespaces(): ThunkAction<Promise<Array<Namespace>>, RootState, undefined, any> {
  return thunkTemplate((token: string) => {
    console.log(token);
    return apiService.get<Namespace[]>('/api/orchestrator/namespaces', token).then(
      async (data: Namespace[]) => {
        console.log(data);
        return data;
      }, () => {
        console.log('error');
        return {};
      }
    );
  }, new Promise<Namespace[]>(() => {}));
}