import React from 'react'
import {getAllAttachments} from '../db'
import {useMst} from '../state'

function Player(props) {
  const {open} = props
  const {playlist} = useMst()
  const [attachments, setAttachments] = React.useState({})

  React.useEffect(() => {
    getAllAttachments().then(_attachments => setAttachments(_attachments))
  }, [playlist])

  const urls = playlist
    .filter(file => attachments[file.id])
    .map(file => {
      return URL.createObjectURL(attachments[file.id].blob)
    })
  const [current, setCurrent] = React.useState(0)
  const onEnded = () => {
    if (current === urls.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(state => state + 1)
    }
  }
  if (open && playlist.length) {
    return (
      <video
        key="video"
        style={{width: '100%'}}
        onEnded={onEnded}
        controls
        autoPlay
        loop={urls.length === 1}
        src={urls[current]}
        type="video/mp4"
      />
    )
  }
  return null
}

export default Player
