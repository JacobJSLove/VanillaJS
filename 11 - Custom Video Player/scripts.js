// Get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenb = player.querySelector('.full');


// Build functions

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}
function updateButton () {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip () {
	video.currentTime += parseFloat(this.dataset.skip); 
}

function handleRange () {
	video[this.name] = this.value;
}

function handleProgress () {
	const percent = (video.currentTime/ video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function toggleFullScreen() {
	if (full) {
		video.webkitRequestFullscreen();
		full = !full;
		fullscreenb.textContent = '╳';
	}else {
		document.webkitExitFullscreen();
		full = !full;
		fullscreenb.textContent = '✣';
	}
}

// Event listener

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
let full = true;
fullscreenb.addEventListener('click', toggleFullScreen);
toggle.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('change' ,handleRange));
skipButtons.forEach(button => button.addEventListener('click' ,skip));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('click', (e) => mousedown && scub(e));// funkcja scrub potrzebuje event dlatego jest przesyłany
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);