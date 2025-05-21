const tracksRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Track = require('../models/track')

tracksRouter.get('/', async (request, response) => {
  const tracks = await Track.find({})
  // response.json will automatically call toJSON method in the model
  response.json(tracks)
})

tracksRouter.post('/', middleware.authenticateToken, async (request, response) => {
  const track = new Track(request.body)

  const savedTrack = await track.save()

  response.status(201).json(savedTrack)
})

// playlistsRouter.put('/:id', async (request, response) => {

//   const playlistItem = await Playlist.findById(request.params.id)
  
//   if (!playlistItem) {
//     return response.status(404).end()
//   }

//   await playlistItem.save()

//   const updatedPlaylistItem = await Playlist.findById(playlistItem.id)

//   response.json(updatedPlaylistItem)
// })

// playlistsRouter.delete('/:id', async (request, response) => {
//   await Playlist.findByIdAndDelete(request.params.id)

//   response.status(204).end()
// })

module.exports = tracksRouter