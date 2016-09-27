//Do Not Modify the getMusic function
function getMusic(){
  var artist = document.getElementById('artist').value;
  itunes.getMusicByArtist(artist).then(drawSongs);
}

function drawSongs(songList){
  console.log(songList);
  var template = ''
  var songElement = document.getElementById('songs')
    for (var i = 0; i < songList.length; i++) {
      var song = songList[i]
      template += `<div class="img-container">
          <img src="${song.albumArt}"/>
        </div>
        <div class="text-container">
          <p>"${song.title}" - "${song.artist}" - "${song.collection}"</p>
          <audio controls preload="none" style="width:250px;">
          <source src="${song.preview}" type="audio/mp4" /></audio>
          <p>"${song.price}"</p>
        </div>`
    }
    songElement.innerHTML = template
}