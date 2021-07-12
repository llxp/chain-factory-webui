import { Box, Collapse, IconButton, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import React, { useState } from "react";
import SelectAllCheckbox from "./SelectAllCheckbox";
import uuid from 'react-uuid';

export interface IPCollapsedTableRowProps extends ICollapsedTableRowProps {
  handleSelected: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  selected: boolean;
  expanded: boolean;
  onExpand: (
    expanded: boolean
  ) => void;
  rowColumnOrder?: string[];
}

export interface ICollapsedTableRowProps {
  firstKey: string;
  key: string;
  row: Object;
  rowComponent?: JSX.Element;
  selectable?: boolean;
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export default function CollapsedTableRow(props: IPCollapsedTableRowProps) {
  const { row, selectable, selected, firstKey, handleSelected, rowComponent, rowColumnOrder, expanded, onExpand } = props;
  //const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  let keys = Object.keys(row);

  const onClick = (e) => {
    onExpand(!expanded);
  };

  const expandButton = (
    <TableCell onClick={onClick}>
      <IconButton aria-label="expand row" size="small">
        {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </TableCell>
  );

  const checkBox = selectable ? (
    <TableCell padding="checkbox">
      <SelectAllCheckbox handleChange={handleSelected} selected={selected} />
    </TableCell>
  ) : (
    <></>
  );

  const firstRowFirstCell = (key: string) => {
    return (
      <TableCell onClick={onClick} key={row[key]} align="left" component="th" scope="row">
        {row[key]}
      </TableCell>
    );
  };
  const firstRowCell = (key: string) => {
    return (
      <TableCell onClick={onClick} key={row[key] || uuid() + key} component="td" align="right">
        {row[key]}
      </TableCell>
    );
  };

  if (rowColumnOrder) {
    keys = rowColumnOrder;
  }

  const firstRowCells = keys.map((key) => {
    if (key === firstKey) {
      return firstRowFirstCell(key);
    } else {
      return firstRowCell(key);
    }
  });

  const firstRow = (
    <TableRow key={row[firstKey] + "1"} className={classes.root}>
      {checkBox}
      {expandButton}
      {firstRowCells}
    </TableRow>
  );

  const secondRow = rowComponent ? (
    <TableRow key={row[firstKey] + "2"}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box margin={1}>{rowComponent}</Box>
        </Collapse>
      </TableCell>
    </TableRow>
  ) : (
    <></>
  );

  return (
    <React.Fragment>
      {firstRow}
      {secondRow}
    </React.Fragment>
  );
}
