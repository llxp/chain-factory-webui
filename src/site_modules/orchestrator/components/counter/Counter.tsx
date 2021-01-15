import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  Slice,
  selectCount,
} from "./counterSlice";
import { Button, Input } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { selectToken } from "../../../../core_modules/signin/components/signin/SignInSlice";

import './Counter.css';
import logo from "../core/resources/logo.svg";
import styles from "./Counter.module.css";

export function Counter() {
  const count = useSelector(selectCount);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="Center">
      <h1>Counter1</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <div className={styles.row}>
        <Button variant="contained" color="primary" aria-label="Increment value" onClick={() => dispatch(increment())}>+</Button>
        <span className={styles.value}>{count}</span>
        <Button variant="contained" color="primary" aria-label="Decrement value" onClick={() => dispatch(decrement())}>-</Button>
      </div>
      <div className={styles.row}>
        <Input aria-label="Set increment amount" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)}/>
        <Button variant="contained" color="primary" onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>Add Amount</Button>
        <Button variant="contained" color="primary" onClick={() => dispatch(Slice.incrementAsync(Number(incrementAmount) || 0, token))}>Add Async</Button>
      </div>
    </div>
  );
}
