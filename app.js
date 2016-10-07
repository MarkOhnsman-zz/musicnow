Controller()

function Controller() {
  var dataStore = new getMyMusic()

  function drawSongs(songList, control) {
    var songElement = $('#allsongs')
    var template = `<h3>Song Results Found: ${songList.length}</h3>`
    var button = ''
    for (var i = 0; i < songList.length; i++) {
      var song = songList[i]
      if (control == 'remove') {
        button = `<button class="remove">
                    <i id="${song.id}" class="fa fa-minus-square" title="Remove from List" aria-hidden="true"></i>
                  </button>
                  <button class="prom">
                    <i id="${song.id}" class="fa fa-chevron-up" title="Promote" aria-hidden="true"></i>
                  </button>
                  <button class="dem">
                  <i id="${song.id}" class="fa fa-chevron-down" title="Demote" aria-hidden="true"></i>
                  </button>
                  `
      } else {
        button = `<button class="add">
                    <i id="${song.id}" class="fa fa-plus-square" title="Add to List" aria-hidden="true"></i>
                  </button></div>`
      }
      template += `
      <div class="song">
        <div class="img-container">
          <img src="${song.albumArt}"/>
        </div>
        <div class="text-container">
          <p><b>${song.title}</b> &mdash; <em>${song.artist}</em> — Album: '${song.collection}' &mdash; $${song.price}</p>
          <audio controls preload="none">
          <source src="${song.preview}" type="audio/mp4" /></audio>
        </div>
        <div class="controls">
        `+button+`
        </div>
      </div>`
    }
    songElement.html(template)
  }
  $('#allsongs').on('click', 'button.add', function (event) {
    dataStore.addTrack(event.target.id)
    drawSongs(dataStore.getCurrentSongList(), 'add')
  })
  $('#allsongs').on('click', 'button.remove', function (event) {
    dataStore.removeTrack(event.target.id)
    drawSongs(dataStore.getMyMusic(), 'remove')
  })
  $('#allsongs').on('click', 'button.prom', function (event) {
    dataStore.promoteTrack(event.target.id)
    drawSongs(dataStore.getMyMusic(), 'remove')
  })
  $('#allsongs').on('click', 'button.dem', function (event) {
    dataStore.demoteTrack(event.target.id)
    drawSongs(dataStore.getMyMusic(), 'remove')
  })
  $('#art-search').on('submit', function getMusic(event) {
    event.preventDefault();
    var form = event.target;
    var artist = form.artist.value
    dataStore.getMusicByArtist(artist).then(drawSongs, 'add');
  });
  $('#art-search').on('click', 'button.my-music', function (event) {
    drawSongs(dataStore.getMyMusic(), 'remove')
  })
  document.addEventListener('play', function (e) {
    var audios = document.getElementsByTagName('audio');
    for (var i = 0, len = audios.length; i < len; i++) {
      if (audios[i] != e.target) {
        audios[i].pause();
      }
    }
  }, true);
  this.emptyMusic = function () {
    dataStore.clearData()
  }
}
