import * as actions from "../actions";

const initialState = {
  list: [],
  selected: []
};

const metricsListReceived = (state, action) => {
  const { getMetrics } = action;
  return {
    ...state,
    list: getMetrics
  };
};

const toggleMetric = (state, action) => {
  const { metric } = action;

  let selected = state.selected
  if(selected.indexOf(metric) === -1){
    selected.push(metric)
  }else{
    selected.splice(selected.indexOf(metric), 1)
  }

  return {
    ...state,
    selected: selected
  };
};

const handlers = {
  [actions.METRICS_LIST_RECEIVED]: metricsListReceived,
  [actions.METRIC_TOGGLE] : toggleMetric
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
