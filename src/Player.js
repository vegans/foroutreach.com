import React from 'react';
import {useStore} from './hooks/useAppState'
import {db} from './db'

const getAllAttachments = async () => {
  const allDocs = await db.allDocs({
    binary: true,
    include_docs: true,
    attachments: true
  })
  const attachments = allDocs.rows.map(item => ({
    id: item.id,
    blob: item.doc._attachments['movie.mp4'].data
  }))
  return attachments.reduce((result, item) => {
    result[item.id] = item;
    return result;
  }, {})
}

function Player(props) {
  const {open} = props
  const {files, playlist} = useStore()
  const [attachments, setAttachments] = React.useState({})

  React.useEffect(() => {
    getAllAttachments().then(_attachments => setAttachments(_attachments))
  }, [playlist])

  const urls = files.filter(file => playlist.includes(file.id) && attachments[file.id]).map(file => {
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
        src={urls[current]}
        type="video/mp4"
      />
    )
  }
  return null;
}


export default Player;
