import { TableBody } from "@material-ui/core";
import React from "react";
import CollapsedTableRow, { ICollapsedTableRowProps } from "./CollapsedTableRow";

export interface ICollapsedTableBodyProps {
  rows: ICollapsedTableRowProps[];
  selectable?: boolean;
  selectedRows: string[];
  expandedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  setExpandedRows: React.Dispatch<React.SetStateAction<string[]>>;
  isSelected: (name: string) => boolean;
  isExpanded: (name: string) => boolean;
  rowColumnOrder?: string[];
}

export default function CollapsedTableBody(props: ICollapsedTableBodyProps) {
  const { rows, selectable, selectedRows, expandedRows, setSelectedRows, setExpandedRows, isSelected, isExpanded, rowColumnOrder } = props;

  const handleSelected = (checked: boolean, row: ICollapsedTableRowProps) => {

    const name = row.key;
    const selectedIndex = selectedRows.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    setSelectedRows(newSelected);
  };

  const handleExpanded = (expanded: boolean, row: ICollapsedTableRowProps) => {

    const name = row.key;
    const expandedIndex = expandedRows.indexOf(name);
    let newExpanded: string[] = [];

    if (expandedIndex === -1) {
      newExpanded = newExpanded.concat(expandedRows, name);
    } else if (expandedIndex === 0) {
      newExpanded = newExpanded.concat(expandedRows.slice(1));
    } else if (expandedIndex === expandedRows.length - 1) {
      newExpanded = newExpanded.concat(expandedRows.slice(0, -1));
    } else if (expandedIndex > 0) {
      newExpanded = newExpanded.concat(
        expandedRows.slice(0, expandedIndex),
        expandedRows.slice(expandedIndex + 1),
      );
    }

    setExpandedRows(newExpanded);
  };

  console.log(rows);

  const tableRows = rows.map((row) => (
    <CollapsedTableRow
      {...row}
      key={row.key}
      rowColumnOrder={rowColumnOrder}
      selected={isSelected(row.key)}
      expanded={isExpanded(row.key)}
      onExpand={(expanded: boolean) => { handleExpanded(expanded, row)}}
      handleSelected={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => { handleSelected(checked, row)}}
      selectable={selectable}
    />
  ));

  console.log(tableRows);

  return (
    <TableBody>
      {tableRows}
    </TableBody>
  );
}