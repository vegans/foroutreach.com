import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FilterListIcon from '@material-ui/icons/FilterList'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Tags from './Tags'
import {useMst} from '../state'

const TagSelector = props => {
  const [open, setOpen] = React.useState(false)
  const {videos} = useMst()
  return (
    <>
      <Tooltip title="Tags">
        <IconButton onClick={() => setOpen(state => !state)}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={() => setOpen(state => !state)}
        open={open}
        fullWidth
        maxWidth="sm">
        <DialogTitle id="simple-dialog-title">
          Tags ({videos.length} videos found)
        </DialogTitle>
        <Tags />
      </Dialog>
    </>
  )
}

export default TagSelector
