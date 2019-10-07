import React from "react"
import { Provider, createClient } from "urql";
import Grid from '@material-ui/core/Grid'
import MetricsList from "./MetricsList"
import Chart from "./Chart"

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

export default () => {
  return (
    <Provider value={client}>
      <Grid container>
        <Grid item lg={3}>
          <MetricsList />
        </Grid>
        <Grid item lg={9}>
          <Chart />
        </Grid>
      </Grid>
    </Provider>
  );
};
