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

tracksRouter.put('/:id', async (request, response) => {
  const { title, url, composer, performer, category } = request.body

  const track = await Track.findById(request.params.id)
  
  if (!track) {
    return response.status(404).json({ error: 'track not found' })
  }

  track.title = title;
  track.url = url;
  track.composer = composer;
  track.performer = performer;
  track.category = category;

  const updatedTrack = await track.save()

  response.json(updatedTrack)
})

tracksRouter.delete('/:id', async (request, response) => {
  const deleted = await Track.findByIdAndDelete(request.params.id)

  if (!deleted) {
    return response.status(404).json({ error: 'track not found' })
  }
  
  response.status(204).end()
})

module.exports = tracksRouter