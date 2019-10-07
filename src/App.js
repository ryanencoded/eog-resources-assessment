import React from "react";
import createStore from "./store";
import { SubscriptionClient } from "subscriptions-transport-ws"
import { Provider as ReduxProvider } from "react-redux";
import { Provider as GraphQLProvider, createClient, defaultExchanges, subscriptionExchange } from "urql";

import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Metrics from "./components/Metrics"

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

const subscriptionClient = new SubscriptionClient(
  "ws://react.eogresources.com/graphql", { reconnect: true, timeout: 20000 }
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

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ReduxProvider store={store}>
      <GraphQLProvider value={client}>
        <Wrapper>
          <Header />
          <Metrics />
          <ToastContainer />
        </Wrapper>
      </GraphQLProvider>
    </ReduxProvider>
  </MuiThemeProvider>
);

export default App;
