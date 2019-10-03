import {types, flow} from 'mobx-state-tree'
import {db, getAttachment, putVideo} from '../db'
import axios, {CancelToken} from 'axios'
import filesize from 'filesize'
import {createRemoteUrl} from './helpers'

const VideoTag = types.model('VideoTag', {
  id: types.identifier,
  name: types.string,
})

export default types
  .model('Video', {
    id: types.identifier,
    title: types.string,
    object: types.frozen(),
    selected: false,
    tags: types.array(VideoTag),
  })
  .actions(self => ({
    afterCreate: flow(function* afterCreate() {
      const cachedBlob = yield getAttachment(self.id)
      if (cachedBlob) {
        self.setBlob(cachedBlob)
      }
    }),
    setBlob(blob) {
      const newUrl = URL.createObjectURL(blob)
      self.localUrl = newUrl
    },
    removeCachedVideo: flow(function* removeCachedVideo() {
      try {
        const doc = yield db.get(self.id)
        yield db.remove(doc)
        self.localUrl = null
        self.selected = false
      } catch (e) {
        console.log('err', e)
      }
    }),
    onDownloadProgress(progressEvent) {
      const progress = (progressEvent.loaded / progressEvent.total) * 100
      self.progress = progress === 100 ? null : progress
    },
    cancelDownload() {
      self.source.cancel('Operation canceled by the user.')
    },
    setSelected(value = !self.selected) {
      self.selected = value
    },
    download: flow(function* download() {
      self.isDownloading = true
      self.source = CancelToken.source()
      try {
        const blob = yield axios({
          url: self.remoteUrl,
          method: 'GET',
          responseType: 'blob',
          cancelToken: self.source.token,
          onDownloadProgress: self.onDownloadProgress,
        }).then(response => {
          return new Blob([response.data])
        })
        const newBlob = yield putVideo(self.id, blob)
        self.setBlob(newBlob)
        self.isDownloading = false
        self.selected = true
      } catch (error) {
        self.isDownloading = false
        if (axios.isCancel(error)) {
          self.progress = null
          throw error
        }
      }
    }),
  }))
  .views(self => {
    return {
      get remoteUrl() {
        return createRemoteUrl(self.object)
      },
      get size() {
        return filesize(self.object.size * 1024, {round: 0})
      },
    }
  })
  .volatile(self => ({
    localUrl: null,
    isDownloading: false,
    progress: null,
    source: null,
  }))
