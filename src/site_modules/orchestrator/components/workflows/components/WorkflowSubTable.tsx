import { Avatar, Button, CircularProgress, createStyles, Divider, Grid, Hidden, List, ListItem, ListItemAvatar, ListItemText, makeStyles, TextField, Theme, Typography, Paper, Badge, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
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
    block: {
      display: 'block',
    },
    roundShapeRunning: {
      backgroundColor: '#ffff00',
      width: 40,
      height: 40,
      display: 'inline-block',
      borderRadius: '50%',
      animation: `$myEffect 1.5s linear infinite`,
    },
    roundShapeSuccess: {
      backgroundColor: '#00ff00',
      width: 40,
      height: 40,
      display: 'inline-block',
      borderRadius: '50%',
      float: 'left',
    },
    roundShapeFailure: {
      backgroundColor: '#ff0000',
      width: 40,
      height: 40,
      display: 'inline-block',
      borderRadius: '50%',
      float: 'left',
    },
    "@keyframes myEffect": {
      "50%": {
        opacity: 0.3
      },
    }
  }),
);

const TaskComponent = ({task_id, args, name, created_date, searchTerm, status}) => {
  const classes = useStyles();
  const scrollRef = useRef<HTMLLIElement>(null);
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
          //console.log(ptn);
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

  useEffect(() => {
    if (scrollRef && scrollRef.current && scrollRef.current !== null) {
      const ref = scrollRef.current;
      if (ref) {
        ref.scrollIntoView();
      }
    }
  }, [data?.rows]);

  if (isLoading) {
    return <CircularProgress/>;
  }

  const style={};
  if (status[0]?.status) {
    switch(status[0]?.status?.toLowerCase()) {
      case 'task':
      case 'none':
        style['backgroundColor'] = '#00FF00';
        break;
      case 'exception':
      case 'timeout':
      case 'false':
      case 'aborted':
      case 'stopped':
        style['backgroundColor'] = '#FF0000';
        break;
      case 'running':
        style['backgroundColor'] = '#FFFF00';
        break;
    }
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={status[0]?.status} style={style} src="/static/images/avatar/1.jpg"/>
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
            <br/>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              Status: {status[0]?.status}
            </Typography>
            <List style={{maxHeight: 200, overflow: 'auto'}}>
              {data?.rows.map((row) => {
                return <li ref={scrollRef} key={'1' + uuid()}>{row}</li>;
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
  onStop?: (
      workflow_id: string,
      namespace: string
    ) => void;
  onAbort?: (
    workflow_id: string,
    namespace: string
  ) => void;
  workflow_id: string;
  //tasks: Array<Task>;
  namespace: string;
}

export function WorkflowSubTable(props: IWorkflowSubTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const reduxDispatch = useReduxDispatch();
  const classes = useStyles();

  const handleStop = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    props.onStop?.(props.workflow_id, props.namespace);
  };

  const handleAbort = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    props.onAbort?.(props.workflow_id, props.namespace);
  };

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
          //console.log(ptn);
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

  const queryStatusResult = useQuery<WorkflowStatus[]>(
    ["WorkflowStatus", props.workflow_id],
    () => {
      return reduxDispatch(
        getWorkflowStatus(props.namespace, props.workflow_id)
      ).then(
        (ptn: WorkflowStatus[]) => {
          //console.log(ptn);
          return ptn;
        },
        () => {
          return [];
        }
      );
    }, {
      refetchOnWindowFocus: false,
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
      //enabled: data?.rows
    }
  );

  if (isLoading || queryStatusResult.isLoading) {
    return <CircularProgress/>;
  }

  const queryStatusResultData = queryStatusResult?.data || [];

  const StatusIndicator = (props) => {
    switch(queryStatusResultData[0]?.status.toLowerCase()) {
      case 'task':
      case 'none':
        return <div className={classes.roundShapeSuccess} {...props}/>;
      case 'exception':
      case 'timeout':
      case 'false':
      case 'aborted':
      case 'stopped':
        return <div className={classes.roundShapeFailure} {...props}/>;
      case 'running':
        return <div className={classes.roundShapeRunning} {...props}/>;
    }
    return <></>;
  };
  
  return (
    <div>
      <Divider variant="middle" component="div" light={true}/>
      <Grid container spacing={0} justifyContent="flex-start" wrap="wrap" alignItems="flex-start" direction="row" style={{marginTop: 20, marginBottom: 20}}>
        <Grid container md={12}>
          <Grid item md={8} direction="row-reverse">
              <StatusIndicator/>
          </Grid>
          <Grid item md={2}>
          <Paper>{/* <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              > */}
                Workflow Status: {queryStatusResultData[0]?.status}
              {/* </Typography> */}
              </Paper>
          </Grid>
          <Grid item md={2}>
            {/* <SearchBox onSearch={setSearchTerm} value={searchTerm}/><br/><br/> */}
            <Button variant="contained" color="primary" size="small" onClick={handleStop} disabled={queryStatusResultData[0]?.status !== 'Running'}>Stop</Button>
            <Button variant="contained" color="primary" size="small" onClick={handleAbort} disabled={queryStatusResultData[0]?.status !== 'Running'}>Abort</Button>
            <RefreshButton onRefresh={refetch}/>
          </Grid>
        </Grid>
        <Grid container md={12}>
          <Grid item md={1}></Grid>
          <Grid item md={11} style={{ flexShrink: 1, wordWrap: 'break-word' }}>
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
                return (
                  <>
                    <TaskComponent task_id={task.task_id} args={task.arguments} name={task.name} created_date={task.received_date} searchTerm={searchTerm} status={queryStatusResultData[0]?.tasks.filter((task_status) => task_status.task_id === task.task_id)}/>
                    <Divider variant="inset" component="li"/>
                  </>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default WorkflowSubTable;
