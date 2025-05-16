const playlistsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Playlist = require('../models/playlist')

playlistsRouter.get('/', async (request, response) => {
  const playlists = await Playlist.find({})
  // response.json will automatically call toJSON method in the model
  response.json(playlists)
})

playlistsRouter.post('/', middleware.authenticateToken, async (request, response) => {
  const playlistItem = new Playlist(request.body)

  const savedPlaylistItem = await playlistItem.save()

  response.status(201).json(savedPlaylistItem)
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

module.exports = playlistsRouter