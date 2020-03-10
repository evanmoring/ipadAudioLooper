
var chaptersNumber = 7;
var songList  = [
    {text:"Chapter I", source:"audio/1.mp3"},
    {text:"Chapter II", source:"audio/2.mp3"},
    {text:"Chapter III", source:"audio/3.mp3"},
    {text:"Chapter IV", source:"audio/4.mp3"},
    {text:"Chapter V", source:"audio/5.mp3"},
    {text:"Chapter VI", source:"audio/6.mp3"},
    {text:"Chapter VII", source:"audio/7.mp3"}
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
    songList[0].audio.autoplay = true;
}


function pauseAll() {
      var sounds = document.getElementsByTagName('audio');
      for(let i=0; i<sounds.length; i++) {
          sounds[i].pause();
          sounds[i].currentTime=0;
        }    
    }

function playAudio(path) {
    path.audio.play();
    } 

function changeSong(){
    pauseAll();
    playAudio(songList[currentSong]);
}