// play btn
let audioMusic = document.querySelector('audio')
let playBtn = document.querySelector('.play__control .fa-play').parentElement
let pauseBtn = document.querySelector('.fa-pause').parentElement
let banner = document.querySelector('.play__body .banner .banner-ctn')
let img = document.querySelector('.play__body .banner img')
let btns = document.querySelectorAll('.btn')

for (let btn of btns) {
    btn.addEventListener('mousedown', () => {
        btn.classList.add('btn--click')
    })
    btn.addEventListener('mouseup', () => {
        btn.classList.remove('btn--click')
    })
}

playBtn.addEventListener('click', playMusic)

pauseBtn.addEventListener('click', pauseMusic)

// render Times
let durationTime = document.querySelector('p#duration-time')
let currentTime = document.querySelector('p#current-time')
let range = document.querySelector('.times-range .range')
let intervalMusic;

let repectBtn = document.querySelector('.btn .fas.fa-sync-alt').parentElement

audioMusic.onloadedmetadata = function () {
    let time = renderTimes(audioMusic.duration)
    durationTime.innerHTML = time
}

audioMusic.onplay = function () {
    updateCurrentTime()
    renderRange(audioMusic.duration, audioMusic.currentTime)
    intervalMusic = setInterval(() => {
        updateCurrentTime()
        renderRange(audioMusic.duration, audioMusic.currentTime)
    }, 1000)
}

audioMusic.onended = function () {
    resetMusic()
    let isOneRepect = repectBtn.firstElementChild.classList.contains('repect-one')
    if (isOneRepect) {
        audioMusic.play()
        playMusic()
    }
}

audioMusic.onpause = function () {
    let time = renderTimes(audioMusic.currentTime)
    currentTime.innerHTML = time
    clearInterval(intervalMusic)
}

function playMusic() {
    audioMusic.play()
    playBtn.classList.remove('open')
    pauseBtn.classList.add('open')
    img.classList.add('active-img')
    banner.classList.add('active-ban')
}

function pauseMusic() {
    audioMusic.pause()
    pauseBtn.classList.remove('open')
    playBtn.classList.add('open')
    img.classList.remove('active-img')
    banner.classList.remove('active-ban')
}

function resetMusic() {
    playBtn.classList.add('open')
    pauseBtn.classList.remove('open')
    img.classList.remove('active-img')
    banner.classList.remove('active-ban')
    range.style.width = '0%'
    audioMusic.currentTime = 0
    updateCurrentTime()
}

function updateCurrentTime() {
    let time = renderTimes(audioMusic.currentTime)
    currentTime.innerHTML = time
}

function renderTimes(audioTimes) {
    let m = Math.floor(audioTimes / 60)
    let s = Math.floor(audioTimes % 60)
    if (m < 10) m = '0' + m
    if (s < 10) s = '0' + s
    return `
    ${m}:${s}
    `
}

function renderRange(duration, current) {
    let percent = (current / duration) * 100
    range.style.width = `${percent.toFixed(2)}%`
}

// resetBtn

repectBtn.addEventListener('click', () => {
    let repect = repectBtn.firstElementChild.classList
    let isRepect;
    for (let item of repect) {
        if (item === 'repect-all') {
            isRepect = 'all'
        } else
            if (item === 'repect-one') {
                isRepect = 'one'
            } else {
                isRepect = false;
            }
    }
    if (isRepect === 'all') {
        repect.remove('repect-all')
        repect.add('repect-one')
    }
    if (isRepect === 'one') {
        repect.remove('repect-one')
    }
    if (!isRepect) {
        repect.add('repect-all')
    }
})

// range click
let divRange = range.parentElement
let widthRanges = document.querySelector('.width-range')
let widthRange, widthStep
widthStep = widthRanges.getBoundingClientRect()
widthRange = widthStep.right - widthStep.left

window.onresize = function () {
    widthStep = widthRanges.getBoundingClientRect()
    widthRange = widthStep.right - widthStep.left
}

divRange.addEventListener('click', (e) => {
    let percent1 = (e.offsetX / widthRange * 100)
    range.style.width = `${percent1.toFixed(2)}%`
    let current = percent1 / 100 * audioMusic.duration
    audioMusic.currentTime = current
    updateCurrentTime()
    rangeHover.classList.remove('active--hover')
    timesHover.classList.remove('open')
})

let rangeHover = document.querySelector('.range__hover')
let timesHover = document.querySelector('.times .times__hover')
let rangeBtn = document.querySelector('.range .range__btn')

rangeBtn.addEventListener('mousemove', (e) => { e.stopPropagation() })
rangeBtn.addEventListener('click', (e) => { e.stopPropagation() })
// rangeHover.addEventListener('mousemove', (e) => { e.stopPropagation() })

divRange.addEventListener('mousemove', (e) => {
    e.stopPropagation()
    let percent = (e.offsetX / widthRange * 100)
    let time = audioMusic.duration * percent / 100
    rangeHover.classList.add('active--hover')
    timesHover.classList.add('open')
    rangeHover.style.width = `${percent.toFixed(2)}%`
    timesHover.style.left = `${percent.toFixed(2)}%`
    timesHover.innerHTML = renderTimes(time)
})

divRange.addEventListener('mouseleave', () => {
    rangeHover.classList.remove('active--hover')
    timesHover.classList.remove('open')
})

// menu
let menuBtn = document.querySelector('.fas.fa-bars')
let menu = document.querySelector('.menu')
let menuClose = document.querySelector('.fas.fa-times')

menuBtn.parentElement.addEventListener('click', () => {
    let isOpen = menu.classList.contains('open__menu')
    if (isOpen) {
        menu.classList.add('faceOut')
        menuBtn.style.display = 'block'
        menuClose.style.display = 'none'
        setTimeout(() => {
            menu.classList.remove('open__menu')
            menu.classList.remove('faceOut')
        }, 500)
    } else {
        menu.classList.add('open__menu')
        menuBtn.style.display = 'none'
        menuClose.style.display = 'block'
    }
})