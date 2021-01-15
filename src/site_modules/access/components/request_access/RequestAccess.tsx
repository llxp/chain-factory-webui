import classes from '*.module.css';
import { Button, Card, CardContent, createStyles, Grid, InputLabel, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, useReduxDispatch } from '../../../../core_modules/signin/components/signin/SignInSlice';
import { Resource } from './models/Resource';
import { Scope } from './models/Scope';
import './RequestAccess.css';
import { selectScopesStatus, selectScopes, getScopes, getResources, selectResources, selectResourcesStatus, requestAccess, RequestAccessResponse } from './RequestAccessSlice';
import { ResourceList } from './ResourceList';
import { TransferList } from './TransferList';

/*interface Scope {
  path?: string;
  display_name: string;
}*/

/*const scopes: Array<Scope> = [
  { path: '/networking/devices/switches/switch01' },
  { path: '/networking/devices/switches/switch02' },
  { path: '/networking/devices/switches/switch03' },
  { path: '/networking/devices/server/server01' },
  { path: '/networking/devices/server/server02' },
  { path: '/networking/devices/server/server03' },
  { path: '/storage/appliances/appliance01' },
  { path: '/storage/appliances/appliance02' },
  { path: '/storage/appliances/appliance03' },
  { path: '/server/datacenter01/server01' },
  { path: '/server/datacenter01/server02' },
  { path: '/server/datacenter01/server03' }
];*/

interface ComboboxScope {
  scope: Scope;
  index: number;
}

function CustomAutocomplete(scopeLabel: string, scopeOptions: Array<ComboboxScope>, onChange) {
  const getOptionLabel = (option: ComboboxScope): string => {
    if (option.scope.display_name) {
      return option.scope.display_name;
    }
    if (option.scope.path) {
      return option.scope.path
    }
    return '';
  };
  return (
    <Autocomplete
      options={scopeOptions}
      getOptionLabel={getOptionLabel}
      className="Autocomplete"
      renderInput={(params) => <TextField {...params} label={scopeLabel} variant="standard" />}
      onChange={onChange}
    />
  );
}

function ScopeComponent(
  index: number,
  scopeLabel: string,
  scopeOptions: Array<ComboboxScope>,
  selectedScopes: Array<ComboboxScope>,
  setSelectedScopes: React.Dispatch<React.SetStateAction<Array<ComboboxScope>>>
) {
  const onChange = (event: React.ChangeEvent<{}>, value: any) => {
    const newSelectedPartialPath = new Array<ComboboxScope>();
    let valueReplaced = false;
    for (const currentScope of selectedScopes) {
      if (currentScope.index === index) {
        break;
      } else {
        newSelectedPartialPath.push(currentScope);
      }
    }
    if (!valueReplaced && value) {
      newSelectedPartialPath.push(value);
    }
    setSelectedScopes(newSelectedPartialPath);
  };
  return CustomAutocomplete(scopeLabel, scopeOptions, onChange);
}

function FilterScopeListFromCurrentPath(path: string, scopes: Array<Scope>) {
  return scopes.filter(scope => scope.path && scope.path.startsWith(path));
}

function currentPath(filteredScopePaths: Array<ComboboxScope>, index: number): string {
  if (filteredScopePaths.length === 1) {
    return '/';
  } else {
    return '/' + filteredScopePaths.slice(1, index + 1).map<string>((value) => { if (value.scope.path) { return value.scope.path } return '' ; }).join('/');
  }
}

function currentPathDisplay(filteredScopePaths: Array<ComboboxScope>, index: number): string {
  if (filteredScopePaths.length === 1) {
    return '/';
  } else {
    return '/' + filteredScopePaths.slice(1, index + 1).map<string>((value) => { if (value.scope.path) { return value.scope.display_name } return '' ; }).join('/');
  }
}

/*function filterSubScopes(subScopes: Array<Scope>, index: number): Array<ComboboxScope> {
  return subScopes
  .map<ComboboxScope>(
    (value: Scope) => {
      if (value && value.path) {
        return {
          scope: {
            path: value.path.split('/')[index + 1],
            display_name: value.display_name
          },
          index: index + 1
        }
      } else {
        return { scope: { path: '', display_name: '' }, index: index + 1 }
      };
    }
  )
  .filter((value, index, arr) => arr.findIndex(t => t.scope.path === value.scope.path) === index);
}*/

function normalizeArray<T>(array: Array<T>, indexKey: keyof T) {
  const normalizedObject: any = {}
  for (let i = 0; i < array.length; i++) {
       const key = array[i][indexKey]
       normalizedObject[key] = array[i]
  }
  return normalizedObject as { [key: string]: T }
}

function ScopesFromPath(scopeLabel: string, selectedScopes: Array<ComboboxScope>, rootScopes: Array<Scope>, setSelectedScopes: React.Dispatch<React.SetStateAction<Array<ComboboxScope>>>, index: number = 0) {
  const scopeOptions: Array<ComboboxScope> = Array<ComboboxScope>();
  const childScopes = Array();
  if (selectedScopes && selectedScopes.length > index) {
    // current scope is already selected
    // so allow to draw any children scopes
    const currentSelectedScope = selectedScopes[index];
    //for (const { index, value } of rootScopes.map((value, index) => ({index, value}))) {
    //  console.log(index);
    //  console.log(selectedScopes);
      if (currentSelectedScope && currentSelectedScope.scope.children) {
        // iterate on children scopes, if there are any
    //    console.log('iterate over child scopes');
        for (const key in currentSelectedScope.scope.children) {
          console.log(currentSelectedScope.scope.children[key]);
          console.log(currentSelectedScope.scope.parent_scope_id);
          childScopes.push(currentSelectedScope.scope.children[key]);
        }
      }
    //}
  }

  // fill current scope options
  for (const value of rootScopes) {
    console.log(value);
    scopeOptions.push({ scope: value, index: index });
  }

  const scopeList = Array();
  const currentCombobox = ScopeComponent(index, scopeLabel, scopeOptions, selectedScopes, setSelectedScopes);
  scopeList.push(currentCombobox);
  
  if (selectedScopes && selectedScopes.length > index) {
    
    if (childScopes.length > 0) {
      const childrenComboboxes = ScopesFromPath(selectedScopes[index].scope.display_name, selectedScopes, childScopes, setSelectedScopes, index + 1);
      //return childrenComboboxes;
      for (const value of childrenComboboxes) {
        scopeList.push(value);
      }
    }
  }
  console.log('scopeList');
  console.log('index: ' + index.toString());
  console.log(scopeList);
  return scopeList;
}

function getSelectedScopePath(selectedScopes: Array<ComboboxScope>): string {
  let path = '';
  for (const scope of selectedScopes) {
    path += '/' + scope.scope.path;
  }
  return path;
}

function getSelectedScopePathDisplay(selectedScopes: Array<ComboboxScope>): string {
  let path = '';
  for (const scope of selectedScopes) {
    path += '/' + scope.scope.display_name;
  }
  return path;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //display: 'inline-block',
    backgroundColor: theme.palette.divider
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function ListOfResources(selectedScopes: Array<ComboboxScope>, setSelectedResources, scopes: Array<Scope>) {
  // get the data from the rest api
  // by requesting the resources
  // under the selected scope
  // using the path e.g. /networking/devices/test_lab
  const [currentPath, setCurrentPath] = useState<string>('');
  const dispatch = useDispatch();
  console.log('ListOfResources');
  const selectedScopePath = getSelectedScopePath(selectedScopes);
  const selectedScopePathDisplay = getSelectedScopePathDisplay(selectedScopes);
  const resourcesStatus = useSelector(selectResourcesStatus);
  const resources = useSelector(selectResources);
  const classes = useStyles();
  console.log(selectedScopePath);
  //if (resourcesStatus == 'finished') {
  console.log(resources);
  //} else {
  if (currentPath !== selectedScopePath) {
    console.log('load new resources');
    console.log(selectedScopePathDisplay);
    setCurrentPath(selectedScopePath);
    dispatch(getResources(selectedScopePath));
  }
  if (resources.length > 0 && selectedScopePath.length > 0) {
    const handleChange = (itemsChecked: Array<Resource>) => {
      console.log('handleChange');
      console.log(itemsChecked);
      setSelectedResources(itemsChecked);
    }
    /*return (
      <Card className={classes.paper} variant="outlined">
        <CardContent>
          <TransferList items={resources} handleChange={handleChange}/>
        </CardContent>
      </Card>);*/
      return <ResourceList items={resources} scopes={scopes} handleChange={handleChange}/>;
      //return <TransferList items={resources} handleChange={handleChange}/>;
  }
  //}
  return <></>;
}

export function RequestAccess() {
  //const initialSelectedPath: ComboboxScope = {scope: { path: 'select scope', display_name: 'Select Scope' }, index: 0};
  //initialSelectedPath
  let [selectedScopes, setSelectedScopes] = useState<Array<ComboboxScope>>([]);

  const dataFetched = useSelector(selectScopesStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dataFetched !== 'loading') {
      console.log('fetch data');
      dispatch(getScopes());
    }
  }, []);
  
  const scopes = useSelector(selectScopes);
  const [itemsChecked, setItemsChecked] = useState<Array<Resource>>();

  const reduxDispatch = useReduxDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const handleOnClick = (ev) => {
    const resources: Array<Resource> | undefined = itemsChecked;
    console.log(resources);
    if (resources) {
      const action = key => (
        <Button onClick={() => { closeSnackbar(key) }}>
          Dismiss
        </Button>
      );
      for (const resource of resources) {
        // TODO: Add a slider to adjust the selected duration of the reuqested access
        reduxDispatch(requestAccess(resource, '8h'))
        .then(
          (status: RequestAccessResponse) => {
          console.log(status);
          const success = status.status === 'access granted';
          enqueueSnackbar(
            success ? 'Requested Resource success: ' + resource.display_name : 'Error requesting resource: ' + resource.display_name + ' Reason: ' + status.status,
            {
              variant: success ? 'success' : 'error',
              autoHideDuration: 20000,
              action
            }
          );
        },
        () => {
          console.log('error requesting the resource');
          enqueueSnackbar(
            'Error requesting resource: ' + resource.display_name + ' Reason: ' + 'unknown',
            {
              variant: 'error',
              autoHideDuration: 20000,
              action
            }
          );
        });
      }
    }
  };

  const showButton = (itemsChecked && itemsChecked.length > 0) ? <Button variant="contained" color="primary" aria-label="Decrement value" onClick={handleOnClick}>Request Access</Button> : <></>;

  return (
    <>
    <div className="Center">
    <h1>Request Access</h1>
      {ScopesFromPath('Select Scope', selectedScopes, scopes, setSelectedScopes)}
      {
        /*
          Under the comboboxes will be spawned a list of resources,
          which are present in the current selected scope
          check box | display_name
        */
      }
      <br/>
      <div className={classes.root}>
      <Grid container>
          <Grid item xs={12} sm={12}>
            <Paper>{ListOfResources(selectedScopes, setItemsChecked, scopes)}</Paper>
          </Grid>
          <Grid item xs={12} sm={12}>{showButton}</Grid>
        </Grid>
        {/*ListOfResources(selectedScopes, setItemsChecked)*/}
      </div>
    </div>
    </>
  );
};
