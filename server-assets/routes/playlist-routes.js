const router = require('express').Router();
const Playlist = require('../models/playlist-model');

module.exports.mountPath = '/playlists'
module.exports.router = router;

router.route('/:id?')
  .get(function (req, res, next) {
    if (req.params.id) {
      Playlist.getById(req.params.id, req.query.include, function (playlist) {
        if(playlist.stack) { return next(playlist) }
        return res.send(playlist)
      })
    } else {
      Playlist.getAll(req.query.include, function (playlists) {
        if(playlists.stack) { return next(playlists) }
        return res.send(playlists);
      });
    }
  })
  .post(function (req, res, next) {
    Playlist.create(req.body, function (playlist) {
      if(playlist.stack) { return next(playlist) }
      return res.send(playlist)
    })
  })


  .put(function (req, res, next) {
    Playlist.addSong(req.body, req.params.id, function(playlist){
      if(playlist.stack) { return next(playlist) }
      return res.send(playlist)
  })
  })
  .delete(function (req, res, next) {
    res.send('We are working on it....')
  })