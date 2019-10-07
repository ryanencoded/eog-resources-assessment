import React from "react"
import { Provider, createClient } from "urql";

import MetricsList from "./MetricsList"

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

export default () => {
  return (
    <Provider value={client}>
      <MetricsList />
    </Provider>
  );
};
