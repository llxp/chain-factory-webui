import {Backdrop, Button, CircularProgress, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import useReduxDispatch from "../../../../../shared_utils/ReduxDispatch";
import { selectNamespace } from "../../core/NamespaceSelector.reducer";
import ListItemType from "../models/ListItemType";
import CollapsedTable from "../../../shared_components/CollapsedTable/CollapsedTable";
import { ICollapsedTableRowProps } from "../../../shared_components/CollapsedTable/CollapsedTableRow";
import WorkflowSubTable from "./WorkflowSubTable";
import { getWorkflows, stopWorkflow } from "./WorkflowTable.service";
import workflowsToListItemType from "./utils/WorkflowsToListItemType";
import PagedWorkflows from "../models/PagedWorkflows";
import Workflow from "../models/Workflow";
import uuid from 'react-uuid';
import { store } from "../../../../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export interface IProps {}

export default function WorkflowTable(props: IProps) {
  const reduxDispatch = useReduxDispatch();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const namespace = useSelector(selectNamespace);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState<string>("");

  store.subscribe(() => {
    setPage(0);
  });

  const { isLoading, error, data, refetch } = useQuery<{
    rows: Array<ListItemType>;
    total_count: number;
  }>(
    ["Workflows", page, rowsPerPage, namespace, searchTerm],
    () => {
      setOpen(true);
      return reduxDispatch(
        getWorkflows(namespace, page, rowsPerPage, searchTerm)
      ).then(
        (ptn: PagedWorkflows) => {
          setOpen(false);
          console.log(ptn);
          return {
            rows: ptn.workflows.map<ListItemType>((value: Workflow) =>
              workflowsToListItemType(value.workflow_id, value.created_date, value.tasks, value.tags || [], value.namespace)
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


  const snackbarAction = (key) => (
    <Button
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      Dismiss
    </Button>
  );

  const handleStop = (
    workflow_id: string,
    namespace: string
  ) => {
    // start the task
    // show a spinner until task has been started successfully
    // if the task has been started or it has been errored, show a notification
    setOpen(true);
    reduxDispatch(
      stopWorkflow(namespace, workflow_id)
    ).then(
      () => {
        setOpen(false);
        enqueueSnackbar("Task stopped!", {
          variant: "success",
          autoHideDuration: 3000,
          action: snackbarAction,
        });
      },
      () => {
        setOpen(false);
        enqueueSnackbar("Error stopping task!", {
          variant: "error",
          autoHideDuration: 3000,
          action: snackbarAction,
        });
      }
    );
  };

  const handleRefresh = () => {
    console.log('refetch');
    refetch();
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    setPage(0);
  };

  const handlePageChange = (page: number) => {
    console.log(page);
    setPage(page);
  };

  const handleRowsPerPageChange = (rowsPerPage: number) => {
    console.log(rowsPerPage);
    setRowsPerPage(rowsPerPage);
  };

  if (error || isLoading) {
    return (
      <>
        <CollapsedTable
          firstColumnKey="created_date"
          rows={[]}
          headerLabels={["Timestamp", "Entry Task", "Namespace"]}
          firstColumnLabel="Timestamp"
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
  if (data && data["rows"] && !isLoading) {
    const tempRows: Array<ListItemType> = data["rows"];
    for (const rowData of tempRows) {
      const rowComponent = (<WorkflowSubTable
        workflow_id={rowData.workflow_id}
        //tasks={rowData.tasks}
        namespace={rowData.namespace}
        onStop={handleStop}
        key={rowData.namespace + rowData.workflow_id}
      />);
      rows.push({
        firstKey: "created_date",
        row: {...rowData.data, "namespace": rowData.namespace},
        rowComponent: rowComponent,
        key: rowData.namespace + rowData.workflow_id  + uuid()
      });
    }

    console.log(page, data.total_count, rowsPerPage);

    return (
      <>
      {/* <DetailPanelWithRowClick/> */}
        <CollapsedTable
          firstColumnKey="created_date"
          rows={rows}
          headerLabels={["Timestamp", "Entry Task", "Tags", "Namespace"]}
          rowColumnOrder={['created_date', 'entry_task', 'tags', 'namespace']}
          firstColumnLabel="Timestamp"
          onRefresh={handleRefresh}
          onSearch={handleSearch}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          count={data.total_count}
          selectable
        />
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
