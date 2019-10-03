export async function getVideos() {
  const result = await fetch(
    process.env.REACT_APP_API_BASE + '/videos?_sort=title:ASC',
  )
  const json = await result.json()
  return json.map(video => ({
    object: video.video,
    title: video.title,
    id: video.id,
    tags: video.tags,
  }))
}

export async function getTags() {
  const result = await fetch(process.env.REACT_APP_API_BASE + '/tags')
  const json = await result.json()
  return json.map(tag => ({
    name: tag.name,
    id: tag.id,
  }))
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
