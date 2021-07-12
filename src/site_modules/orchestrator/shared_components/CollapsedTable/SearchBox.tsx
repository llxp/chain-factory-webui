import {
  makeStyles,
  TextField,
  FilledTextFieldProps,
  InputAdornment,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

export interface IProps {
  onSearch?: (text: string) => void;
  onFocus?: (element: JSX.Element) => void;
  style?: React.CSSProperties;
  value?: string;
}

export default function SearchBox(props: IProps) {
  const handleOnChange = (event) => {
    if (props.onSearch) {
      props.onSearch(event.target.value);
    }
  };

  const handleOnFocus = (event) => {
    if (props.onFocus) {
      props.onFocus(event.target);
    }
  };

  /*return (
    <form noValidate autoComplete="off">
      <TextField id="filled-basic" label="Search" variant="outlined" {...props}/>
    </form>
  );*/

  return (
    <TextField
      id="filled-basic"
      size="small"
      label="Search"
      variant="outlined"
      type="search"
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      value={props.value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      style={props.style}
    />
  );
}
