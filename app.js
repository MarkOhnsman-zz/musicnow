//Do Not Modify the getMusic function
function getMusic(){
  var artist = document.getElementById('artist').value;
  itunes.getMusicByArtist(artist).then(drawSongs);
}

function drawSongs(songList){
  console.log(songList);
  var template = `<h3>Song Results Found: ${songList.length}</h3>`
  var songElement = document.getElementById('allsongs')
    for (var i = 0; i < songList.length; i++) {
      var song = songList[i]
      template += `
      <div class="song">
        <div class="img-container">
          <img src="${song.albumArt}"/>
        </div>
        <div class="text-container">
          <p><b>${song.title}</b> &mdash; <em>${song.artist}</em> — Album: '${song.collection}' &mdash; $${song.price}</p>
          <audio controls preload="none" style="width:250px;">
          <source src="${song.preview}" type="audio/mp4" /></audio>
        </div>
      </div>`
    }
    songElement.innerHTML = template
}

