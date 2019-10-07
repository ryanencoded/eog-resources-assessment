import * as actions from "../actions";

const initialState = {
  list: []
};

const metricsListReceived = (state, action) => {
  const { getMetrics } = action;
  console.log(getMetrics)
  return {
    list: getMetrics
  };
};

const handlers = {
  [actions.METRICS_LIST_RECEIVED]: metricsListReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
