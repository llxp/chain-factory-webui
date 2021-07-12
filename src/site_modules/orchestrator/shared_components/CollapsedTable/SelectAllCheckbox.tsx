import { Checkbox } from '@material-ui/core';
import React from 'react';

export interface ISelectAllCheckboxProps {
    selected?: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}
export default function SelectAllCheckbox(props: ISelectAllCheckboxProps) {
  return <Checkbox
    checked={props.selected}
    onChange={props.handleChange}
    color="primary"
  />;
}