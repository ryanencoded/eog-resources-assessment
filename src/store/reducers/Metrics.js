import * as actions from "../actions";
import moment from "moment"

const initialState = {
  list: [],
  selected: [],
  measurements: []
};

const metricsListReceived = (state, action) => {
  const { getMetrics } = action;
  return {
    ...state,
    list: getMetrics
  };
};

const metricsMeasurementsReceived = (state, action) => {
  const { measurements } = action;
  return {
    ...state,
    measurements: measurements.map((metric, i) => {
      return {
        ...metric,
        color: i,
        measurements: metric.measurements.map(measurement => {
          return {
            x: moment(measurement.at).toDate(),
            y: measurement.value
          }
        })
      }
    })
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
  [actions.METRIC_TOGGLE] : toggleMetric,
  [actions.METRICS_MEASUREMENTS_RECEIVED]: metricsMeasurementsReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
