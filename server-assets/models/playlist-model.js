let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  schemator = dataAdapter.schemator,
  DS = dataAdapter.DS,
  formatQuery = dataAdapter.formatQuery;


let Playlists = DS.defineResource({
  name: 'playlist',
  endpoint: 'playlists',
  filepath: __dirname + '/../data/playlists.db',
})

schemator.defineSchema('Playlist', {
  name: {
    type: 'string',
    nullable: false
  },
  id: {
      type: 'string',
      nullable: false
  },
  upvotes: {
      type: 'number',
      nullable: false
  },
  downvotes: {
      type: 'number',
      nullable: false
  }

})

function create(newList, cb) {
  // Use the Resource Model to create a new playlist
  var songId = newList.song.id
  let playlist = { 
    id: uuid.v4(),
    name: newList.name,
    upvotes: 0,
    downvotes: 0,
    songs:{
        [songId]: newList.song
    }
  }
  Playlists.create(playlist)
  .then(cb)
  .catch(cb)
}

function getAll(query, cb) {
  //Use the Resource Model to get all Playlists
  Playlists.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single playlist by its id
  Playlists.find(id, formatQuery(query)).then(cb).catch(cb)
}

function addSong(song, playlistId, cb){
     Playlists.find(playlistId).then(function(playlist){
         playlist.songs[song.id] = song;
      Playlists.update(playlist.id, playlist).then(function(){
        DS.update('playlist', playlist.id, playlist)
          .then(cb)
          .catch(cb)
      }).catch(cb)
    }).catch(cb)
}

function countVote(vote, cb){
    Playlists.find(vote.playlistId).then(function(playlist){
        if(vote.vote == 'up'){
            playlist.upvotes++
        }else{
            playlist.downvotes++
        }
        Playlists.update(playlist.id, playlist).then(function(){
            DS.update('playlist', playlist.id, playlist)
            .then(cb)
            .catch(cb)
        }).catch(cb)
}).catch(cb)
}

function deleteSong(playlistId, songId, cb){
    Playlists.find(playlistId).then(function(playlist){
        playlist.songs[songId] = null
        Playlists.update(playlist.id, playlist)
             .then(cb)
            .catch(cb)
        }).catch(cb)
}

module.exports = {
  create,
  getAll,
  getById,
  addSong,
  countVote,
  deleteSong
}

