var soundcloud = {

  init : function(){
          curSong = "";
          curSongTitle = "";
          curSongStatus = "";


          SC.initialize({
          client_id: 'fb5829bfcdb18a422f38473fbf44b4ca'
          });

          viewBttn = document.getElementById("view");
          playBttn = document.getElementById("play");
          pauseBttn = document.getElementById("pause");
          resumeBttn = document.getElementById("resume");
          viewCurSongBttn = document.getElementById("viewCurSong");
          stopBttn = document.getElementById("stop");
          resultsFld = document.getElementById("results");
          genreFld = document.getElementById("genre");
          indexFld = document.getElementById("index");

          viewBttn.onclick = this.viewBttnListener;
          playBttn.onclick = this.playBttnListener;
          pauseBttn.onclick = this.pauseBttnListener;
          resumeBttn.onclick = this.resumeBttnListener;
          stopBttn.onclick = this.stopBttnListener;
  },


  viewBttnListener: function(e) {
    e.preventDefault();
    var genre = genreFld.value;
    var lim = indexFld.value;
    
    SC.get('/tracks', { genres: genre, limit: lim}, function(tracks) {
      $(resultsFld).html('');
      $(tracks).each(function(index, track) { 
        var streamableStr = track.streamable?"(Streamable)":"(Not streamable)";        
        $(resultsFld).append($('<li></li>').html(track.title + streamableStr));
            
      });
    });
  },
  
  
  playBttnListener: function(e) {
    e.preventDefault();
    var genre = genreFld.value;
    var lim = indexFld.value;
    
    SC.get("/tracks", { genres: genre, limit: lim}, function(tracks){
    var track = tracks[lim-1];
    curSongTitle = track.title;
    curSongStatus = track.streamable?"(Playing)":"(Not streamable)";
    curSongStatus = track.title + curSongStatus;
    $(resultsFld).html($('<li></li>').html(curSongStatus));
    var trackUrl = "/tracks/" + track.id;
    if(curSong != ""){
      curSong.stop();         
    }
    if(track.streamable){
      SC.stream(trackUrl, function(sound){
        curSong = sound;
        sound.play();
        $(pauseBttn).show();
                  
      });
    }else{
      $(pauseBttn).hide();         
    }
      $(resumeBttn).hide();  
    });
  },


  pauseBttnListener: function(e) {
    e.preventDefault();   

    if(curSong != ""){
      curSong.pause();
      curSongStatus = curSongTitle + "(Paused)";
      $(resultsFld).html($('<li></li>').html(curSongStatus));
      $(pauseBttn).hide();
      $(resultsFld).show();          
    }         
  },

  resumeBttnListener: function(e) {
    e.preventDefault();   

    if(curSong != ""){
      curSong.play();
      curSongStatus = curSongTitle + "(Playing)";
      $(resultsFld).html($('<li></li>').html(curSongStatus));
      $(pauseBttn).show();
      $(resumeBttn).hide();          
    }         
  },

  
  viewCurSongListener: function(e) {
    e.preventDefault();
    if(curSongStatus == ""){
      $(resultsFld).html($('<li></li>').html("No song is currently playing"));
    }else{
      $(resultsFld).html($('<li></li>').html(curSongStatus));
    }     
  },

  stopBttnListener: function(e) {
    e.preventDefault();   

    if(curSong != ""){
      curSong.stop();
      curSongStatus = curSongTitle + "(Stopped)";
      $(resultsFld).html($('<li></li>').html(curSongStatus));
      $(pauseBttn).hide();
      $(resumeBttn).hide();          
    }else{
      alert("No song is currently playing");
    }       
  },

}

window.onload = soundcloud.init();

  
  
