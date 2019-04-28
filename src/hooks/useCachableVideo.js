import React from 'react'
import useOnlineStatus from './useOnlineStatus'
import {db} from '../db'
import axios from 'axios'
import filesize from 'filesize'

function useCancelToken() {
  const [source, setSource] = React.useState(axios.CancelToken.source())
  const cancel = msg => {
    source.cancel(msg)
    setSource(axios.CancelToken.source())
  }
  return [source.token, cancel]
}

const putVideo = async (id, blob) => {
  await db.put({
    _id: id,
    _attachments: {
      'movie.mp4': {
        content_type: 'video/mp4',
        data: blob,
      },
    },
  })
  return db.getAttachment(id, 'movie.mp4')
}

export function createRemoteUrl(video) {
  if (video.provider === 'digitalocean') {
    return (
      process.env.REACT_APP_SPACES_URL + '/' + video.url.split('/').reverse()[0]
    )
  }
  if (video.provider === 'local') {
    return process.env.REACT_APP_LOCAL_URL + '/' + video.url
  }
  return video.url
}

function useCachableVideo({id, video}) {
  const [url, setUrl] = React.useState(null)
  const [cancelToken, cancel] = useCancelToken()
  const size = filesize(video.size * 1024, {round: 0})
  const remoteUrl = createRemoteUrl(video)
  const [progress, setProgress] = React.useState(null)
  const online = useOnlineStatus()
  const [isDownloading, setIsDownloading] = React.useState(false)
  const setBlob = blob => {
    const newUrl = URL.createObjectURL(blob)
    setUrl(newUrl)
  }
  const checkCached = async () => {
    const cachedBlob = await db.getAttachment(id, 'movie.mp4')
    if (cachedBlob) {
      setBlob(cachedBlob)
    }
  }
  const download = async () => {
    setIsDownloading(true)
    try {
      const blob = await axios({
        url: remoteUrl,
        method: 'GET',
        responseType: 'blob',
        onDownloadProgress: progressEvent => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100
          setProgress(progress === 100 ? null : progress)
        },
        cancelToken,
      }).then(response => {
        return new Blob([response.data])
      })
      const newBlob = await putVideo(id, blob)
      setBlob(newBlob)
      setIsDownloading(false)
    } catch (error) {
      setIsDownloading(false)
      if (axios.isCancel(error)) {
        setProgress(null)
        throw error
      }
    }
  }
  const removeCachedVideo = async () => {
    try {
      const doc = await db.get(id)
      await db.remove(doc)
      setUrl(null)
    } catch (e) {
      console.log('err', e)
    }
  }
  const cancelDownload = async () => {
    cancel()
  }
  React.useEffect(() => {
    checkCached()
  }, [])
  return {
    download,
    online,
    url,
    isDownloading,
    removeCachedVideo,
    progress,
    size,
    cancelDownload,
  }
}

export default useCachableVideo
