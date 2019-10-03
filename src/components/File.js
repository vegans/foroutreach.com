import React from 'react'
import {observer} from 'mobx-react-lite'
import useOnlineStatus from '../hooks/useOnlineStatus'
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

function File({video, classes}) {
  const {title, id, localUrl} = video
  const event = action =>
    ReactGA.event({
      category: 'File',
      action,
      label: `${id} (${title})`,
    })
  const online = useOnlineStatus()
  if (!localUrl && !online) {
    return null
  }
  const toggleOrDownload = async () => {
    if (!localUrl) {
      event(`Download started`)
      await video.download()
      event('Download completed')
    } else {
      video.setSelected()
    }
  }
  const remove = () => {
    event(`File removed`)
    video.removeCachedVideo()
  }
  const handleCancel = () => {
    video.cancelDownload()
    event('Download cancelled')
  }
  return (
    <TableRow selected={video.selected}>
      <TableCell padding="none" className={classes.icon}>
        {video.isDownloading ? (
          <ProgressWithCancel
            progress={video.progress}
            onClick={handleCancel}
          />
        ) : (
          <Checkbox
            onClick={toggleOrDownload}
            checked={video.selected}
            disabled={video.isDownloading}
          />
        )}
      </TableCell>
      <TableCell padding="none">
        <Typography variant="subtitle2">{title}</Typography>
        <div className={classes.seperator}>
          <Typography variant="caption">
            <AvailableIcon url={video.localUrl} />
            {!video.isDownloading && `${video.size} `}
            {video.progress && `Downloading...`}
            {!video.progress && video.isDownloading && `Processing...`}
          </Typography>
          <Tags tags={video.tags} />
        </div>
      </TableCell>
      <TableCell padding="none" align="right" className={classes.icon}>
        {localUrl ? (
          <Delete onClick={remove} />
        ) : (
          <IconButton disabled={video.isDownloading} onClick={video.download}>
            <GetAppIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  )
}

export default withStyles(styles)(observer(File))
