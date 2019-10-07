import React from "react"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const MetricItem = ({
  checked,
  onChange,
  value,
  label
}) => (
  <FormControlLabel
    control={
      <Checkbox checked={checked} onChange={onChange} value={value} color="primary" />
    }
    label={label}
  />
)

export default MetricItem
