import React from 'react'
import useCachableVideo from '../hooks/useCachableVideo'
import {useStore} from '../hooks/useAppState'
import {withStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import GetAppIcon from '@material-ui/icons/GetApp'
import Checkbox from '@material-ui/core/Checkbox'
import Delete from './Delete'
import Typography from '@material-ui/core/Typography'
import ReactGA from 'react-ga'
import ProgressWithCancel from './ProgressWithCancel'
import Tags from './file/Tags'
import AvailableIcon from './file/AvailableIcon'

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
  seperator: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    width: 48,
    justifyContent: 'top',
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
  const event = action =>
    ReactGA.event({
      category: 'File',
      action,
      label: `${id} (${title})`,
    })
  if (!url && !online) {
    return null
  }
  const toggleOrDownload = async () => {
    if (!url) {
      event(`Download started`)
      await download()
      event('Download completed')
    }
    togglePlaylistItem(id)
  }
  const remove = () => {
    event(`File removed`)
    removeCachedVideo()
    removePlaylistItem(id)
  }
  const selected = isPlaylistItem(id)
  const handleCancel = () => {
    cancelDownload()
    event('Download cancelled')
  }
  return (
    <TableRow selected={selected}>
      <TableCell padding="none" className={classes.icon}>
        {isDownloading ? (
          <ProgressWithCancel progress={progress} onClick={handleCancel} />
        ) : (
          <Checkbox
            onClick={toggleOrDownload}
            checked={selected}
            disabled={isDownloading}
          />
        )}
      </TableCell>
      <TableCell padding="none">
        <Typography variant="subtitle2">{title}</Typography>
        <div className={classes.seperator}>
          <Typography variant="caption">
            <AvailableIcon url={url} />
            {!isDownloading && `${size} `}
            {progress && `Downloading...`}
            {!progress && isDownloading && `Processing...`}
          </Typography>
          <Tags tags={tags} />
        </div>
      </TableCell>
      <TableCell padding="none" align="right" className={classes.icon}>
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
