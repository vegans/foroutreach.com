import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  icon: {
    marginRight: 3,
    marginTop: 2,
  },
})

function AvailableIcon({url, classes}) {
  if (!url) {
    return null
  }
  return (
    <Tooltip placement="right" title="This video is available offline">
      <SaveIcon color="secondary" fontSize="inherit" className={classes.icon} />
    </Tooltip>
  )
}

export default withStyles(styles)(AvailableIcon)
