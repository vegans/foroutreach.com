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
