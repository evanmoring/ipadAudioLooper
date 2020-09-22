
var chaptersNumber = 5;
var songList  = [
    {text:"Track 1", source:"audio/1.mp3"},
    {text:"Track 2", source:"audio/2.mp3"},
    {text:"Track 3", source:"audio/3.mp3"},
    {text:"Track 4", source:"audio/4.mp3"},
    {text:"Track 5", source:"audio/5.mp3"}
];

var currentSong = 0;
var dotList = document.getElementsByClassName("dot");

function initial(){
    for(let i = 0; i < chaptersNumber;  i++) {
        console.log(songList)
        let cChapter = songList[i]
        cChapter.name =document.getElementById(i+1);
        cChapter.indicator = document.createElement('IMG');
        cChapter.indicator.src = "playwhite.png";
        cChapter.indicator.height = "50";
        cChapter.indicator.width = "50";
        cChapter.indicator.classList.add ("dot");
        cChapter.name.appendChild(cChapter.indicator)

        cChapter.button = document.createElement('P');
        cChapter.button.innerHTML =String(cChapter.text);
        cChapter.button.classList.add ("chapter");
        cChapter.button.onclick = function () { currentSong = i; changeSong(); };
        cChapter.name.appendChild(cChapter.button)

        cChapter.audio = document.createElement('Audio');
        if (i==(chaptersNumber-1)) {
            cChapter.audio.onended = function () { console.log(currentSong); currentSong = 0; changeSong();};
        }
        else{
            cChapter.audio.onended = function () {console.log(currentSong); currentSong =(i+1); changeSong();};
        }
        //cChapter.audio.controls=true;
        cChapter.name.appendChild(cChapter.audio);
        cChapter.audio.onplay = function(){
            for (let i=0;i < songList.length; i++){
                console.log(i)
                songList[i].indicator.style.visibility = "hidden";
            }
            cChapter.indicator.style.visibility = 'visible';
        }

        let audioSource = document.createElement("Source");
        audioSource.src = cChapter.source;
        audioSource.type = "audio/mpeg";
        cChapter.audio.appendChild(audioSource);
    }
    //songList[0].audio.autoplay = true;
}


function pauseAll() {
      var sounds = document.getElementsByTagName('audio');
      for(let i=0; i<sounds.length; i++) {
          sounds[i].pause();
          sounds[i].currentTime=0;
        }    
    }

var mute = false;
function muteAll() {
      var sounds = document.getElementsByTagName('audio');
      for(let i=0; i<sounds.length; i++) {
          if (!mute){
              sounds[i].muted=true;
              console.log('mute')
          }
          else{
              sounds[i].muted=false;
              console.log('unmute')
          }
          

        }   
    mute = !mute;
    if (!mute){
    document.getElementById('muteText').innerHTML = 'MUTE'
        document.getElementById('muteText').style.color = 'white'
        document.getElementById('mute').style.display = 'none'
        document.getElementById('unmute').style.display = 'inline-block'
    }
    else{
        document.getElementById('mute').style.display = 'inline-block'
        document.getElementById('unmute').style.display = 'none'
        document.getElementById('muteText').style.color = 'red'
       document.getElementById('muteText').innerHTML = 'UNMUTE' 
    }
    
    }

function unmuteAll() {
      var sounds = document.getElementsByTagName('audio');
      for(let i=0; i<sounds.length; i++) {
          sounds[i].muted=false;
        }    
    }

function playAudio(path) {
    path.audio.play();
    } 

function changeSong(){
    pauseAll();
    playAudio(songList[currentSong]);
}
