console.log("Welcome to Spotify");

// Initial the Variables
let songIndex = 0;
let audioElement = new Audio('Tum Hi Ho.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let audioNameChange = document.getElementById('audioNameChange');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    { songName: "Tum Hi Ho", filePath: "Tum Hi Ho.mp3", coverPath: "Tum_Hi_Ho.jpg" },
    { songName: "Tanhaai - Arijit Singh", filePath: "05 Tanhaai - Arijit Singh.mp3", coverPath: "Tanhaai.jpg" },
    { songName: "Musafir", filePath: "Musafir Reprise - Sweetiee Weds NRI (Arijit Singh) 320Kbps.mp3", coverPath: "Musafir.jpg" },
    { songName: "Maan_Le", filePath: "Maan Le - Arijit Singh.mp3", coverPath: "Maan_Le.jpg" },
    { songName: "Zindagi Ko Hi5", filePath: "Zindagi Ko Hi5 - Arijit Singh.mp3", coverPath: "Zindagi Ko Hi5.jpg" },
    { songName: "Ami Je Tomar - Bhool Bhulaiyaa 2", filePath: "Ami Je Tomar - Bhool Bhulaiyaa 2.mp3", coverPath: "Ami_Je_Tomar.jpg" },
]

songItem.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// audioElement.play();



// Handle play/pause click
masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //Update SeekBar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})



// Constructing a function to make other buttons play while one is playing.

const makeAllplays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}


// Play that song on click

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {

        console.log(e.target);
        makeAllplays();
        songIndex = parseInt(e.target.id);

        if (audioElement.paused || audioElement.currentTime <= 0) {
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');

            // console.log(songs[`${songIndex-1}`].filePath);

            audioElement.src = songs[`${songIndex - 1}`].filePath;   // Identifying the song.

            audioNameChange.innerText = songs[`${songIndex - 1}`].songName;

            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
        else {
            e.target.classList.remove('fa-paused');
            e.target.classList.add('fa-play');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        }
    })
})


document.getElementById('next').addEventListener('click', () => {
    if (songIndex > 6) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }

    audioElement.src = songs[`${songIndex - 1}`].filePath;   // Identifying the song.
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

    audioNameChange.innerText = songs[`${songIndex - 1}`].songName;
})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 6;
    }
    else {
        songIndex -= 1;
    }

    audioElement.src = songs[`${songIndex - 1}`].filePath;   // Identifying the song.
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

    audioNameChange.innerText = songs[`${songIndex - 1}`].songName;
})