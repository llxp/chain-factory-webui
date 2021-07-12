import { Grid, Hidden } from "@material-ui/core";
import React, { useEffect } from "react";
import { BrowserView, MobileView } from 'react-device-detect';
import WorkflowTable from "./components/WorkflowTable";

export function Workflows() {
  useEffect(() => {
    document.title = "Workflows"
  }, []);
  
  return (
    <div>
      <Hidden xsDown>
      <Grid container spacing={0} justifyContent="center" alignItems="center" wrap="nowrap" style={{marginTop: 50}}>
        <Grid item md={3}/>
        <Grid item md={6}>
          <WorkflowTable/>
        </Grid>
        <Grid item md={3}/>
      </Grid>
      </Hidden>
      <Hidden smUp><WorkflowTable/></Hidden>
    </div>
  );
}

export default Workflows;