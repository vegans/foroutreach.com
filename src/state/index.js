import React, {useContext} from 'react'
import {types, flow} from 'mobx-state-tree'
import localForage from 'localforage'
import {persist} from 'mst-persist'
import {detect} from 'detect-browser'
import Video from './Video'
import {getVideos, getTags} from './helpers'

const MSTContext = React.createContext(null)

export const Provider = MSTContext.Provider

export function useMst(mapStateToProps) {
  const store = useContext(MSTContext)
  if (typeof mapStateToProps !== 'undefined') {
    return mapStateToProps(store)
  }
  return store
}

const Tag = types
  .model('Tag', {
    id: types.identifier,
    name: types.string,
    selected: false,
  })
  .actions(self => ({
    setSelected(value) {
      if (typeof value === 'boolean') {
        self.selected = value
      } else {
        self.selected = !self.selected
      }
    },
  }))

const ForOutreach = types
  .model('ForOutreach', {
    allVideos: types.array(Video),
    tags: types.array(Tag),
    browser: types.frozen(),
  })
  .actions(self => ({
    afterHydration: flow(function* afterCreate() {
      const videos = yield getVideos()
      self.tags = yield getTags()
      videos.forEach(video => {
        if (!self.allVideos.find(_video => video.id === _video.id)) {
          self.allVideos.push(video)
        }
      })
    }),
  }))
  .views(self => ({
    get videos() {
      if (self.selectedTags.length === 0) {
        return self.allVideos
      }
      return self.allVideos.filter(video => {
        const videoTags = video.tags.map(tag => tag.id)
        return self.selectedTags.every(id => videoTags.includes(id))
      })
    },
    get playlist() {
      return self.allVideos.filter(v => v.selected)
    },
    get selectedTags() {
      return self.tags.filter(tag => tag.selected).map(tag => tag.id)
    },
    get isValidBrowser() {
      return (
        self.browser &&
        self.browser.name &&
        ['firefox', 'chrome'].includes(self.browser.name)
      )
    },
  }))

const rootStore = ForOutreach.create({
  browser: detect(),
})

export const State = ({children}) => (
  <Provider value={rootStore}>{children}</Provider>
)

persist('@ForOutreach', rootStore, {
  storage: localForage,
  jsonify: false,
}).then(() => {
  rootStore.afterHydration()
})
