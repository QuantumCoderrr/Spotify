console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Let Me Love You by DJ Snake - ft. Justin Bieber", filepath: "Songs/1.mp3", coverpath: "Covers/1.jpeg"},
    {songName: "Photograph by Ed Sheeran", filepath: "Songs/2.mp3", coverpath: "Covers/2.jpeg"},
    {songName: "Hips Don't Lie by Shakira - ft. Wyclef Jean", filepath: "Songs/3.mp3", coverpath: "Covers/3.jpeg"},
    {songName: "Back to December by Taylor Swift", filepath: "Songs/4.mp3", coverpath: "Covers/4.jpeg"},
    {songName: "People You Know by Selena Gomez", filepath: "Songs/5.mp3", coverpath: "Covers/5.jpeg"},
    {songName: "Getaway Car by Taylor Swift", filepath: "Songs/6.mp3", coverpath: "Covers/6.jpeg"},
    {songName: "Calm Down by Rema and Selena Gomez", filepath: "Songs/7.mp3", coverpath: "Covers/7.jpeg"},
    {songName: "Style by Taylor Swift", filepath: "Songs/8.mp3", coverpath: "Covers/8.jpeg"},
    {songName: "Pink Venom by Blackpink", filepath: "Songs/9.mp3", coverpath: "Covers/9.jpeg"},
    {songName: "All Too Well by Taylor Swift", filepath: "Songs/10.mp3", coverpath: "Covers/10.jpeg"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

//Handle Play,Pause and Click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity =0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 10;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
