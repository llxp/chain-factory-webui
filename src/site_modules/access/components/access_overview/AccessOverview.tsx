import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReduxDispatch } from "../../../../core_modules/signin/components/signin/SignInSlice";
import { Resource } from "../request_access/models/Resource";
import { ResourceList } from "../request_access/ResourceList";
import { AccessList, ListItemType } from "./AccessList";
import { getAssignedResources, getGlobalResources, revokeRequest, revokeResources, selectAssignedResources, selectAssignedResourcesStatus, selectGlobalResources, translateUsers } from "./AccessOverviewSlice";
import { AccessStatusTable } from "./AccessStatusTable";
import { ApprovableResource } from "./models/ApprovableResource";

export interface IProps {
  globalAccess?: boolean;
}

export function AccessOverview(props: IProps) {
  const [ selected, setSelected ] = useState<Array<ApprovableResource>>([]);

  const dispatch = useDispatch();
  const reduxDispatch = useReduxDispatch();

  const assignedResources = useSelector(selectAssignedResources);
  const globalResources = useSelector(selectGlobalResources);
  const resources = props.globalAccess ? globalResources : assignedResources;

  useEffect(() => {
      console.log('fetch data');
      if (props.globalAccess) {
        reduxDispatch(getGlobalResources()).then((status: boolean) => {
          console.log(status);
          if (status) {
            dispatch(translateUsers(true));
          }
        });
      } else {
        reduxDispatch(getAssignedResources()).then((status: boolean) => {
          console.log(status);
          if (status) {
            dispatch(translateUsers(false));
          }
        });
      }
  }, []);

  const tempRows = resources.map<ListItemType>(
    value => {
      return {
        id: value.id,
        timestamp: value.request_date,
        name: value.resource.display_name,
        status: value.approved_resources ? (value.approved_resources.granted_resource ? (value.approved_resources.granted_resource.enabled ? 'Granted' : 'Revoked') : 'Approved') : value.enabled ? 'Requested' : 'Revoked',
        requestor: value.requestor,
        path: value.resource.path,
      }
    }
  );

  console.log(resources);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = key => (
    <Button onClick={() => { closeSnackbar(key) }}>
      Dismiss
    </Button>
  );

  const handleOnClick = (ev) => {
    // revoke selected resources
    for (const selectedResource of selected) {
      console.log(selectedResource);
      for (const assignedResource of resources) {
        console.log(assignedResource);
        if (assignedResource.id === selectedResource.id) {
          if (assignedResource.approved_resources && assignedResource.approved_resources.granted_resource) {
            const request_id = assignedResource.approved_resources.granted_resource.id;
            reduxDispatch(revokeResources(request_id)).then((status) => {
              const success = status === 'resource disabled';
              enqueueSnackbar(
                success ? 'Resource disabled' : 'Resource could not be disabled. Reason: ' + status,
                {
                  variant: success ? 'success' : 'error',
                  autoHideDuration: 20000,
                  action
                }
              );
            },
            () => {
              enqueueSnackbar(
                'Resource could not be disabled. Unknown Error.',
                {
                  variant: 'error',
                  autoHideDuration: 20000,
                  action
                }
              );
            });
          } else {
            const request_id = assignedResource.id;
            reduxDispatch(revokeRequest(request_id)).then((status) => {
              const success = status === 'request disabled';
              enqueueSnackbar(
                success ? 'Resource disabled' : 'Resource could not be disabled. Reason: ' + status,
                {
                  variant: success ? 'success' : 'error',
                  autoHideDuration: 20000,
                  action
                }
              );
            },
            () => {
              enqueueSnackbar(
                'Resource could not be disabled. Unknown Error.',
                {
                  variant: 'error',
                  autoHideDuration: 20000,
                  action
                }
              );
            });
          }
          break;
        }
      }
    };
    }

  const showButton = (selected && selected.length > 0) ? <Button variant="contained" color="primary" aria-label="Decrement value" onClick={handleOnClick}>Revoke Access</Button> : <></>;

  const headline = props.globalAccess ? 'Global Access Overview' : 'Access Overview';
  return (
    <>
      <div className="Center">
        <h1>{headline}</h1>
        <br/>
        <br/>
        {
          /*
          Here will be put a table of all currently active resources and all resource, which were active in the past
          The active and the past resources will be delimited by a strong horizontal line
          The table header columns will be the following:
            Timestamp | Resource Name (includes a small button to show a small description of the resource) | Status of access | Requestor (Full Name, and includes a small button to show the full contact details) | Button to revoke the acccess
          */
        }
        <AccessList items={tempRows} handleChange={setSelected}/>
        {showButton}
      </div>
    </>
  );
}
