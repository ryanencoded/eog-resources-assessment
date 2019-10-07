import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { useQuery } from "urql";

import MetricItem from "./MetricItem"

const query = `
query {
  getMetrics
}
`;

const MetricsList = ({

}) => {
    const dispatch = useDispatch();
    const metrics = useSelector(state => state.metrics.list)
    const [result] = useQuery({
      query
    });
    const { fetching, data, error } = result;

    useEffect(
      () => {
        if (error) {
          dispatch({ type: actions.API_ERROR, error: error.message });
          return;
        }
        if (!data) return;
        const { getMetrics } = data;
        dispatch({ type: actions.METRICS_LIST_RECEIVED, getMetrics });
      },
      [dispatch, data, error]
    );

    return(
      <div>
        {metrics.map(metric => (
          <MetricItem
            label={metric}
            value={metric}
          />
        ))}
      </div>
    )

}

export default MetricsList
