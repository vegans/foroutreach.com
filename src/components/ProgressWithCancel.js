import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import CancelIcon from '@material-ui/icons/Cancel'

function ProgressWithCancel({onClick, progress}) {
  return (
    <IconButton onClick={onClick}>
      <CancelIcon
        color="primary"
        style={{position: 'absolute', fontSize: 14}}
      />
      <CircularProgress
        variant={progress ? 'static' : 'indeterminate'}
        value={progress}
        color="secondary"
        size={22}
        thickness={5}
      />
    </IconButton>
  )
}

export default ProgressWithCancel
