const mongoose = require('mongoose');

const PlaylistItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  composer: String,
  performer: String,
  category: String,
})

PlaylistItemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Playlist', PlaylistItemSchema)