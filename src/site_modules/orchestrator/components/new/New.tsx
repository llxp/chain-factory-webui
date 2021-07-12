import { Grid, Hidden } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TaskTable from './components/TaskTable';

export function New() {
  useEffect(() => {
    document.title = "New"
  }, []);
  
  return (
    <div>
      <Hidden xsDown>
      <Grid container spacing={0} justifyContent="center" alignItems="center" wrap="nowrap" style={{marginTop: 50}}>
        <Grid item md={3}/>
        <Grid item md={6}>
          <TaskTable/>
        </Grid>
        <Grid item md={3}/>
      </Grid>
      </Hidden>
      <Hidden smUp><TaskTable/></Hidden>
    </div>
  );
}

export default New;
