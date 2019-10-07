import React, { useEffect } from "react"

import { useDispatch } from "react-redux"
import * as actions from "../store/actions"
import { useQuery } from "urql";

import Grid from '@material-ui/core/Grid'

import Loading from "./Loading"
import RangeSelect from "./RangeSelect"
import CurrentMetrics from "./CurrentMetrics"
import Chart from "./Chart"

const getMetrics = `
  query {
    getMetrics
  }
`;

export default () => {
  const dispatch = useDispatch()

  // Fetch the metrics list
  const [result] = useQuery({ query: getMetrics });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }

    if (!data) return;
    const { getMetrics: metricsList } = data;
    dispatch({ type: actions.METRICS_LIST_RECEIVED, metricsList });
  }, [dispatch, data, error])

  //Check if we are fetching the metrics
  if(fetching) return <Loading />

  return (
    <div>
      <Grid container>
        <Grid item lg={6}>
          <CurrentMetrics />
        </Grid>
        <Grid item lg={6}>
          <Chart />
        </Grid>
      </Grid>
    </div>
  );
};
