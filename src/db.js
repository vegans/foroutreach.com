import PouchDB from 'pouchdb'

export const db = new PouchDB('kittens')

export const getAllAttachments = async () => {
  const allDocs = await db.allDocs({
    binary: true,
    include_docs: true,
    attachments: true,
  })
  const attachments = allDocs.rows.map(item => ({
    id: item.id,
    blob: item.doc._attachments['movie.mp4'].data,
  }))
  return attachments.reduce((result, item) => {
    result[item.id] = item
    return result
  }, {})
}

export const getAttachment = async id => {
  try {
    const cachedBlob = await db.getAttachment(id, 'movie.mp4')
    if (cachedBlob) {
      return cachedBlob
    }
  } catch (e) {
    // No saved file found
  }
  return false
}

export const putVideo = async (id, blob) => {
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
