import React from "react"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { Provider, createClient,  defaultExchanges, subscriptionExchange } from "urql";
import Grid from '@material-ui/core/Grid'
import RangeSelect from "./RangeSelect"
import CurrentMetrics from "./CurrentMetrics"
import MetricsList from "./MetricsList"
import Chart from "./Chart"

const subscriptionClient = new SubscriptionClient(
  "ws://react.eogresources.com/graphql",
  {
    reconnect: true,
    timeout: 20000
  }
);

const client = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    }),
  ]
});

export default () => {
  return (
    <Provider value={client}>

      <CurrentMetrics />

      <Grid container>
        <Grid item lg={3}>
          <MetricsList />
          <RangeSelect />
        </Grid>
        <Grid item lg={9}>
          <Chart />
        </Grid>
      </Grid>
    </Provider>
  );
};
