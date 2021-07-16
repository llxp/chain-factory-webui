import {Backdrop, Button, CircularProgress, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import useReduxDispatch from "../../../../../shared_utils/ReduxDispatch";
import { selectNamespace } from "../../core/NamespaceSelector.reducer";
import ListItemType from "../models/ListItemType";
import PagedTaskNodes from "../models/PagedTaskNodes";
import CollapsedTable from "../../../shared_components/CollapsedTable/CollapsedTable";
import { ICollapsedTableRowProps } from "../../../shared_components/CollapsedTable/CollapsedTableRow";
import TaskSubTable from "./TaskSubTable";
import { getAvailableTasks, startTask } from "./TaskTable.service";
import tasksToListItemType from "./utils/TasksToListItemType";
import uuid from 'react-uuid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export interface IProps {}

export function TaskTable(props: IProps) {
  const reduxDispatch = useReduxDispatch();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const namespace = useSelector(selectNamespace);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { isLoading, error, data, refetch } = useQuery<{
    rows: Array<ListItemType>;
    total_count: number;
  }>(
    ["NodeTasks", page, rowsPerPage, namespace, searchTerm],
    () => {
      setOpen(true);
      return reduxDispatch(
        getAvailableTasks(namespace, page, rowsPerPage, searchTerm)
      ).then(
        (ptn: PagedTaskNodes) => {
          setOpen(false);
          //console.log(ptn);
          return {
            rows: ptn.task_nodes.map<ListItemType>((value) =>
              tasksToListItemType(value.task, value.node_names, value.namespace)
            ),
            total_count: ptn.total_count,
          };
        },
        () => {
          setOpen(false);
          enqueueSnackbar("Error fetching data from server!", {
            variant: "error",
            autoHideDuration: 3000,
            action: snackbarAction,
          });
          return {
            rows: [],
            total_count: 0,
          };
        }
      );
    }, {
      refetchOnWindowFocus: false
    }
  );

  // function createData(
  //   name: string,
  //   tags: string[],
  //   args: any
  // ) {
  //   return {
  //     data: {
  //       name,
  //       tags
  //     },
  //     arguments: args
  //   };
  // }

  // const args = {};
  // args['i'] = 'str';
  // args['times'] = 'int';

  // const rowsData = [
  //   createData('Frozen yoghurt', ['123', '234'], args),
  //   createData('Ice cream sandwich', ['123', '234'], args),
  //   createData('Eclair', ['123', '234'], args),
  //   createData('Cupcake', ['123', '234'], args),
  //   createData('Gingerbread', ['123', '234'], args),
  //   createData('Gingerbread2', ['123', '234'], args),
  //   createData('Gingerbread3', ['123', '234'], args),
  //   createData('Gingerbread4', ['123', '234'], args),
  // ];

  const snackbarAction = (key) => (
    <Button
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      Dismiss
    </Button>
  );

  const handleStart = (
    task: string,
    selectedArguments: Map<string, string>,
    nodeSelection: string,
    tags: string[],
    namespace: string
  ) => {
    // start the task
    // show a spinner until task has been started successfully
    // if the task has been started or it has been errored, show a notification
    setOpen(true);
    reduxDispatch(
      startTask(namespace, nodeSelection, task, selectedArguments, tags)
    ).then(
      () => {
        setOpen(false);
        enqueueSnackbar("Task started!", {
          variant: "success",
          autoHideDuration: 3000,
          action: snackbarAction,
        });
      },
      () => {
        setOpen(false);
        enqueueSnackbar("Error starting task!", {
          variant: "error",
          autoHideDuration: 3000,
          action: snackbarAction,
        });
      }
    );
  };

  const handleRefresh = () => {
    //console.log('refetch');
    refetch();
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const handlePageChange = (page: number) => {
    //console.log(page);
    setPage(page);
  };

  const handleRowsPerPageChange = (rowsPerPage: number) => {
    //console.log(rowsPerPage);
    setRowsPerPage(rowsPerPage);
  };

  if (error || isLoading) {
    return (
      <>
        <CollapsedTable
          firstColumnKey="name"
          rows={[]}
          headerLabels={["Name"]}
          firstColumnLabel="Name"
          page={page}
          rowsPerPage={rowsPerPage}
          onRefresh={handleRefresh}
          count={0}
        />
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  const rows: ICollapsedTableRowProps[] = [];
  if (data && data["rows"]) {
    const tempRows: Array<ListItemType> = data["rows"];
    for (const rowData of tempRows) {
      if (namespace === 'default') {
        //console.log(rowData);
        rows.push({
          firstKey: "name",
          row: {...rowData.data, "namespace": rowData.namespace},
          rowComponent: (
            <TaskSubTable
              arguments={rowData.arguments}
              nodeNames={rowData.nodeNames}
              handleStart={handleStart}
              task={rowData.task.name}
              namespace={rowData.namespace}
              key={rowData.namespace + rowData.task.name + uuid()}
            />
          ),
          key: rowData.namespace + rowData.task.name + uuid()
        });
      } else {
        rows.push({
          firstKey: "name",
          row: rowData.data,
          rowComponent: (
            <TaskSubTable
              arguments={rowData.arguments}
              nodeNames={rowData.nodeNames}
              handleStart={handleStart}
              task={rowData.task.name}
              namespace={rowData.namespace}
              key={rowData.namespace + rowData.task.name + uuid()}
            />
          ),
          key: rowData.namespace + rowData.task.name + uuid()
        });
      }
    }
  }

  //console.log(rows);

  if (namespace === 'default') {
    return (
      <>
        <CollapsedTable
          firstColumnKey="name"
          rows={rows}
          headerLabels={["Name", "Namespace"]}
          firstColumnLabel="Name"
          onRefresh={handleRefresh}
          onSearch={handleSearch}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          count={data?.total_count || 0}
        />
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <>
      <CollapsedTable
        firstColumnKey="name"
        rows={rows}
        headerLabels={["Name"]}
        firstColumnLabel="Name"
        onRefresh={handleRefresh}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        count={data?.total_count || 0}
      />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default TaskTable;
