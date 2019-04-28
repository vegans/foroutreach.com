import React from 'react'
import useCachableVideo from './hooks/useCachableVideo'
import Chip from '@material-ui/core/Chip'
import {useStore} from './hooks/useAppState'
import {withStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import GetAppIcon from '@material-ui/icons/GetApp'
import SaveIcon from '@material-ui/icons/Save'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import Delete from './components/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import CancelIcon from '@material-ui/icons/Cancel'
import Typography from '@material-ui/core/Typography'

function ProgressWithCancel({onClick}) {
  return (
    <IconButton onClick={onClick}>
      <CancelIcon
        color="primary"
        style={{position: 'absolute', fontSize: 14}}
      />
      <CircularProgress color="secondary" size={22} thickness={5} />
    </IconButton>
  )
}

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

function File({id, video, title, thumbnail, megabytes, tags = [], classes}) {
  const {isPlaylistItem, togglePlaylistItem, removePlaylistItem} = useStore()
  const {
    download,
    online,
    url,
    isDownloading,
    removeCachedVideo,
    progress,
    size,
    cancelDownload,
  } = useCachableVideo({id, video})
  if (!url && !online) {
    return null
  }
  const toggleOrDownload = async () => {
    if (!url) {
      await download()
    }
    togglePlaylistItem(id)
  }
  const remove = () => {
    removeCachedVideo()
    removePlaylistItem(id)
  }
  const selected = isPlaylistItem(id)
  return (
    <TableRow selected={selected}>
      <TableCell padding="none" style={{verticalAlign: 'top'}}>
        {isDownloading ? (
          <ProgressWithCancel onClick={cancelDownload} />
        ) : (
          <Checkbox
            onClick={toggleOrDownload}
            checked={selected}
            disabled={isDownloading}
          />
        )}
      </TableCell>
      <TableCell padding="none" component="th" scope="row" />
      <TableCell padding="none">
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption">
          {size && (
            <Tooltip placement="right" title="This video is available offline">
              <SaveIcon color="secondary" fontSize="inherit" />
            </Tooltip>
          )}
          {size ? ` ${size} ` : ` ${megabytes} MB `}
          {progress && `Downloading: ${progress.toFixed(2)}%`}
          {!progress && isDownloading && `Processing...`}
        </Typography>
      </TableCell>
      <TableCell padding="none" align="right">
        {tags.map(tag => (
          <Chip key={tag.id} variant="outlined" label={tag.name} />
        ))}
      </TableCell>
      <TableCell padding="none" align="right">
        {url ? (
          <Delete onClick={remove} />
        ) : (
          <IconButton disabled={isDownloading} onClick={download}>
            <GetAppIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(File)
