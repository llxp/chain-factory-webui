import { AutocompleteChangeDetails, AutocompleteChangeReason } from "@material-ui/lab";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Combobox from "../../../../shared_components/Combobox";
import useReduxDispatch from "../../../../shared_utils/ReduxDispatch";
import { Namespace } from "./models/Namespace";
import { selectNamespace, setNamespace } from "./NamespaceSelector.reducer";
import { getNamespaces } from "./NamespaceSelector.service";

export default function NamespaceSelector() {
  const reduxDispatch = useReduxDispatch();
  
  const { isLoading, error, data } = useQuery<Array<string>>(
    ['Namespaces'],
    () => reduxDispatch(
      getNamespaces()
    ).then(
      (namespaces: Array<Namespace>) => {
        return namespaces.map((namespace) => { return namespace.namespace; });
      }
    )
  );

  const namespace = useSelector(selectNamespace);
  const dispatch = useDispatch();
  
  console.log(data);

  if (data) {
    const handleChange = (event: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => {
      dispatch(setNamespace(value));
      console.log(namespace);
    };

    return <Combobox options={data} label="Select Namespace" handleChange={handleChange}/>
  }
  return <></>;
}