import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/actions"
import { useQuery } from "urql"
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis'
import Loading from "./Loading"

const query = `
  query SelectedMetricsAndMeasurements($metrics: [MeasurementQuery]){
    getMultipleMeasurements(input: $metrics) {
    	metric,
      measurements {
        at,
        value,
        unit
      }
    }
  }
`;

const Chart = () => {
  const dispatch = useDispatch()
  const metrics = useSelector(state => state.metrics)

  const [result] = useQuery({
    query,
    variables: {
      metrics: metrics.selected.map(metric => ({ metricName: metric }))
    }
  });

  const { fetching, data, error } = result;

  useEffect(
    () => {
      if (error) {
        dispatch({ type: actions.API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      const { getMultipleMeasurements } = data;
      console.log(getMultipleMeasurements)
      dispatch({ type: actions.METRICS_MEASUREMENTS_RECEIVED, measurements: getMultipleMeasurements});
    },
    [dispatch, data, error]
  );

  if(fetching){
    return <Loading />
  }

  console.log(metrics)
  return(
    <XYPlot width={1000} height={600}>
      <VerticalGridLines />
      <HorizontalGridLines />
      {metrics.measurements.map((item, i) => (
        <LineSeries
          key={i}
          data={item.measurements}
        />
      ))}
      <XAxis />
      <YAxis />
    </XYPlot>
  )
}

export default Chart
