import { TableContainer, TableBody, TableRow, TableCell, Table, TableHead, Paper, TablePagination, IconButton, Hidden, Button, TableFooter, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { ICollapsedTableRowProps } from "./CollapsedTableRow";
import SearchBox from "./SearchBox";
import RefreshIcon from "@material-ui/icons/Refresh";
import RefreshButton from "./RefreshButton";
import SelectAllCheckbox from "./SelectAllCheckbox";
import { isMobile } from "react-device-detect";
import { useEffect } from "react";
import CollapsedTableBody from "./CollapsedTableBody";
import CollapsedTableHead from "./CollapsedTableHead";
import { getWindowDimensions } from "../../../../shared_utils/ScreenUtils";
import CollapsedTableHeadMobile from "./CollapsedTableHeadMobile";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';


export interface ICollapsedTableProps {
  rows: ICollapsedTableRowProps[];
  headerLabels: string[];
  rowColumnOrder?: string[];
  firstColumnKey: string;
  firstColumnLabel: string;
  onPageChange?: (page: number) => void;
  page: number;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  rowsPerPage: number;
  selectable?: boolean;
  onSearch?: (text: string) => void;
  onRefresh?: () => void;
  count: number;
}

export default function CollapsedTable(props: ICollapsedTableProps) {
  const { rows, headerLabels, firstColumnKey, firstColumnLabel, selectable, onSearch, onRefresh, onPageChange, onRowsPerPageChange, page, rowsPerPage, count, rowColumnOrder } = props;
  //const [rowsPerPage, setRowsPerPage] = useState(10);
  //const [page, setPage] = useState(0);
  const [selectedAll, setSelectedAll] = useState(false);
  const [expandedAll, setExpandedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const isSelected = (name: string) => selectedRows.indexOf(name) !== -1;
  const isExpanded = (name: string) => expandedRows.indexOf(name) !== -1;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    event?.stopPropagation();
    onPageChange?.(page);
    //setPage(page);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event?.stopPropagation();
    //setRowsPerPage(+event.target.value);
    onRowsPerPageChange?.(+event.target.value);
    onPageChange?.(0);
  };

  const handleSelectAll = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setSelectedAll(checked);
    if (checked) {
      setSelectedRows(
        rows.map((row) => {
          return row.row[firstColumnKey];
        })
      );
      return;
    }
    setSelectedRows([]);
  };

  const handleExpandedAll = (
  ) => {
    setExpandedAll(!expandedAll);
    if (expandedAll) {
      setExpandedRows(
        rows.map((row) => {
          return row.row[firstColumnKey];
        })
      );
      return;
    }
    setExpandedRows([]);
  };

  const heightMobile = getWindowDimensions().height - 190;
  const heightDesktop = getWindowDimensions().height - 250;

  console.log(count, page, rowsPerPage);
  console.log(Math.floor(count / rowsPerPage));
  console.log((Math.floor(count / rowsPerPage) <= 0 || (page + 1) >= Math.floor(count / rowsPerPage)));

  return (
    <div>
      <CollapsedTableHeadMobile selectable={props.selectable} selectedAll={selectedAll} onSelectAll={handleSelectAll} onSearch={onSearch} onRefresh={onRefresh}/>
      <TableContainer
        component={Paper}
        style={{
          maxHeight: isMobile ? heightMobile : heightDesktop,
          minHeight: isMobile ? heightMobile : heightDesktop,
        }}
      >
        <Table aria-label="collapsible table" stickyHeader>
          <CollapsedTableHead
            selectable={selectable}
            firstColumnLabel={firstColumnLabel}
            selectedAll={selectedAll}
            handleSelectAll={handleSelectAll}
            headerLabels={headerLabels}
            onRefresh={onRefresh}
            onSearch={onSearch}
            expandedAll={expandedAll}
            expandAll={() => {
              handleExpandedAll();
            }}
          />
          <CollapsedTableBody
            rows={rows}
            selectable={selectable}
            selectedRows={selectedRows}
            expandedRows={expandedRows}
            setSelectedRows={setSelectedRows}
            setExpandedRows={setExpandedRows}
            isSelected={isSelected}
            isExpanded={isExpanded}
            rowColumnOrder={rowColumnOrder}
          />
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item md={10}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100, 250, 500]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ backgroundColor: "#d0d0d0" }}
          />
        </Grid>
        <Grid item md={2} style={{ backgroundColor: "#d0d0d0" }}>
          <IconButton size="medium" onClick={() => { props.onPageChange?.(0); }} disabled={(Math.floor(count / rowsPerPage) <= 0 || page <= 0)}><SkipPreviousIcon/></IconButton>
          <IconButton size="medium" onClick={() => { props.onPageChange?.(Math.floor(count / rowsPerPage)); }} disabled={(Math.floor(count / rowsPerPage) <= 0 || (page + 1) >= Math.floor(count / rowsPerPage))}><SkipNextIcon/></IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
