import {
  Hidden,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import RefreshButton from "./RefreshButton";
import SearchBox from "./SearchBox";
import SelectAllCheckbox from "./SelectAllCheckbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export interface ICollapsedTableHeadProps {
  selectable?: boolean;
  firstColumnLabel: string;
  selectedAll: boolean;
  expandedAll: boolean;
  handleSelectAll: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  headerLabels: string[];
  onSearch?: (text: string) => void;
  onRefresh?: () => void;
  expandAll?: () => void;
}

export default function CollapsedTableHead(props: ICollapsedTableHeadProps) {
  const {
    selectable,
    firstColumnLabel,
    selectedAll,
    expandedAll,
    handleSelectAll,
    headerLabels,
    onSearch,
    onRefresh,
    expandAll,
  } = props;
  const selectAllBrowser = selectable ? (
    <TableCell
      style={{ backgroundColor: "#d0d0d0" }}
      align="left"
      size="small"
      padding="checkbox"
    >
      <Hidden xsDown>
        <SelectAllCheckbox
          selected={selectedAll}
          handleChange={handleSelectAll}
        />
      </Hidden>
    </TableCell>
  ) : (
    <></>
  );

  const headerCells = headerLabels.map((headerLabel) => {
    if (headerLabel === firstColumnLabel) {
      return (
        <TableCell
          key={headerLabel}
          align="left"
          style={{ backgroundColor: "#d0d0d0" }}
        >
          {headerLabel}
        </TableCell>
      );
    } else {
      return (
        <TableCell
          key={headerLabel}
          align="right"
          style={{ backgroundColor: "#d0d0d0" }}
        >
          {headerLabel}
        </TableCell>
      );
    }
  });

  return (
    <TableHead>
      <TableRow key="header">
        {selectAllBrowser}
        <TableCell style={{ backgroundColor: "#d0d0d0" }}>
          <Hidden xsDown>
            <IconButton size="small" onClick={expandAll}>
              { expandedAll ? <ExpandMoreIcon /> : <ExpandLessIcon/> }
            </IconButton>
            <SearchBox onSearch={onSearch} />
            <RefreshButton onRefresh={onRefresh} />
          </Hidden>
        </TableCell>
        {headerCells}
      </TableRow>
    </TableHead>
  );
}
