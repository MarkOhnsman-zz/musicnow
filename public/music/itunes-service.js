function getMyMusic() {
  var _myTracks = _loadTracks()
  var _currentSongList = []
  var dataStore = this;

  function _loadTracks() {
    var tracks = localStorage.getItem('my-tracks')
    if (tracks) {
      tracks = JSON.parse(tracks)
    } else {
      tracks = {
        myMusic: []
      }
    }
    return tracks
  }
  function _saveTracks() {
    localStorage.setItem('my-tracks', JSON.stringify(_myTracks))
  }
  function _existsInMyMusic(songId){
    for (var i = 0; i < _myTracks.myMusic.length; i++)
        if(_myTracks.myMusic[i].id == songId){
          return true
        }
        return false
  }
  dataStore.getMyMusic = function () {
    return _myTracks.myMusic
  }
  dataStore.clearData = function () {
    localStorage.removeItem('my-tracks')
  }
  dataStore.getCurrentSongList = function () {
    return _currentSongList
  }
  dataStore.addTrack = function (songId) {
    for(var i = 0; i < _currentSongList.length; i++)
      if (_currentSongList[i].id == songId) {
        if(_existsInMyMusic(songId)){
          alert("Already in My MusicNow list")
          return
        }
      _myTracks.myMusic.push(_currentSongList.splice(i, 1)[0])
        _saveTracks()
        return
      }
  }
  dataStore.removeTrack = function (songId) {
    for (var i = 0; i < _myTracks.myMusic.length; i++)
      if (_myTracks.myMusic[i].id == songId) {
        _currentSongList.push(_myTracks.myMusic.splice(i, 1)[0])
        _saveTracks()
        return
      }
  }
  dataStore.promoteTrack = function (songId) {
    for (var i = 0; i < _myTracks.myMusic.length; i++)
      if (_myTracks.myMusic[i].id == songId) {
        if(i==0){
          return
        }
        _myTracks.myMusic.splice(i - 1, 0, _myTracks.myMusic.splice(i, 1)[0]);
        _saveTracks()
      }
  }
  dataStore.demoteTrack = function (songId) {
    for (var i = 0; i < _myTracks.myMusic.length; i++)
      if (_myTracks.myMusic[i].id == songId) {
        _myTracks.myMusic.splice(i+1, 0, _myTracks.myMusic.splice(i, 1)[0])
        _saveTracks()
        return
      }
  }
  dataStore.getMusicByArtist = function (artist, cb) {

      var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?media=music&term=' + artist;
      var apiUrl = url + encodeURIComponent(url2);

      $('#get-music-button').text('LOADING....');

      return $.getJSON(apiUrl).then(function (response) {
        var songList = response.results.map(function (song) {
          return {
            title: song.trackName,
            albumArt: song.artworkUrl60,
            artist: song.artistName,
            collection: song.collectionName,
            price: song.collectionPrice,
            preview: song.previewUrl,
            id: song.trackId
          };
        })
        $('#get-music-button').text('Search New Music');
        _currentSongList = songList
        return songList;
      })
    }
  }
