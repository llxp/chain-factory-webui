import { Avatar, Backdrop, Button, CircularProgress, createStyles, Divider, Grid, Hidden, List, ListItem, ListItemAvatar, ListItemText, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Combobox from '../../../../../shared_components/Combobox';
import Task from '../models/Task';
import SearchBox from '../../../shared_components/CollapsedTable/SearchBox';
import { useQuery } from 'react-query';
import useReduxDispatch from '../../../../../shared_utils/ReduxDispatch';
import { getTaskLogs, getWorkflowStatus, getWorkflowTasks } from './WorkflowTable.service';
import { useSelector } from 'react-redux';
import { selectNamespace } from '../../core/NamespaceSelector.reducer';
import PagedTaskLogs from '../models/PagedTaskLogs';
import uuid from 'react-uuid';
import RefreshButton from '../../../shared_components/CollapsedTable/RefreshButton';
import PagedWorkflowTasks from '../models/PagedWorkflowTasks';
import WorkflowStatus from '../models/WorkflowStatus';

const FormComponent = ({children}) => <form noValidate autoComplete="off">{children}</form>;
const TextFieldComponent = ({label, value, onChange}) => <><TextField label={label} value={value} onChange={onChange}/><br/></>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

const TaskComponent = ({task_id, args, name, created_date, searchTerm}) => {
  const classes = useStyles();
  const reduxDispatch = useReduxDispatch();
  const namespace = useSelector(selectNamespace);
  const page = 0;
  const rowsPerPage = 99999;

  const { isLoading, error, data, refetch } = useQuery<{
    rows: Array<string>;
    total_count: number;
  }>(
    ["TaskLogs", task_id],
    () => {
      return reduxDispatch(
        getTaskLogs(namespace, page, rowsPerPage, searchTerm, task_id)
      ).then(
        (ptn: PagedTaskLogs) => {
          console.log(ptn);
          return {
            rows: ptn.log_lines,
            total_count: ptn.total_count,
          };
        },
        () => {
          return {
            rows: [],
            total_count: 0,
          };
        }
      );
    }, {
      refetchOnWindowFocus: false,
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  );

  if (isLoading) {
    return <CircularProgress/>;
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Task" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={created_date}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              Task: {name}
            </Typography>
            <Divider orientation="vertical" variant="middle" light/>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              Arguments: { JSON.stringify(args) }
            </Typography>
            <List style={{maxHeight: 200, overflow: 'auto'}}>
              {data?.rows.map((row) => {
                return <li key={'1' + uuid()}>{row}</li>;
              })}
            {/* <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li>
            <li> — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this… — I'll be in your neighborhood doing errands this…</li> */}
            </List>
          </React.Fragment>
        }
      />
    </ListItem>
  )
};

export interface IWorkflowSubTableProps {
  onStop?: {
    (
      workflow_id: string,
      namespace: string
    ): void;
  };
  workflow_id: string;
  //tasks: Array<Task>;
  namespace: string;
}

export function WorkflowSubTable(props: IWorkflowSubTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const reduxDispatch = useReduxDispatch();

  const handleStop = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    props.onStop?.(props.workflow_id, props.namespace);
  };

  const classes = useStyles();

  const { isLoading, error, data, refetch } = useQuery<{
    rows: Array<Task>;
    total_count: number;
  }>(
    ["WorkflowTasks", props.workflow_id, searchTerm],
    () => {
      return reduxDispatch(
        getWorkflowTasks(props.namespace, 0, 10000, searchTerm, props.workflow_id)
      ).then(
        (ptn: PagedWorkflowTasks) => {
          console.log(ptn);
          return {
            rows: ptn.tasks,
            total_count: ptn.total_count,
          };
        },
        () => {
          return {
            rows: [],
            total_count: 0,
          };
        }
      );
    }, {
      refetchOnWindowFocus: true,
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  );

  const queryStateResult = useQuery<WorkflowStatus>(
    ["WorkflowStatus", props.workflow_id],
    () => {
      return reduxDispatch(
        getWorkflowStatus(props.namespace, props.workflow_id)
      ).then(
        (ptn: WorkflowStatus) => {
          console.log(ptn);
          return ptn;
        },
        () => {
          return { 'status': 'Running', 'tasks': []};
        }
      );
    }, {
      refetchOnWindowFocus: false,
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  );

  if (isLoading || queryStateResult.isLoading) {
    return <CircularProgress/>;
  }
  
  return (
    <div>
      <Divider variant="middle" component="div" light={true}/>
      <Grid container spacing={0} justifyContent="flex-start" wrap="wrap" alignItems="flex-start" direction="row" style={{marginTop: 20, marginBottom: 20}}>
        <Grid item md={2}>
          {/* <SearchBox onSearch={setSearchTerm} value={searchTerm}/><br/><br/> */}
          <Button variant="contained" color="primary" onClick={handleStop}>Stop</Button>
          <Button variant="contained" color="primary" onClick={handleStop}>Abort</Button>
          <RefreshButton onRefresh={refetch}/>
        </Grid>
        <Grid item md={10} style={{ flexShrink: 1, wordWrap: 'break-word' }}>
          {
            /*
            the logs should be presented in the following form:
            Task name:
            \t\tlog line
            \t\tlog line
            \t\tlog line...
            Task name:
            \t\tlog line
            \t\tlog line
            \t\tlog line...
            ...
            */
          }

          <List className={classes.root}>
            {data?.rows.map((task) => {
              return (<>
                <TaskComponent task_id={task.task_id} args={task.arguments} name={task.name} created_date={task.received_date} searchTerm={searchTerm}/>
                <Divider variant="inset" component="li"/>
              </>);
            })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default WorkflowSubTable;
