const restApi = "http://localhost:3000/srcNhacCuaToi"

let menuRender = document.querySelector('.menu')
let audioMusicRender = document.querySelector('audio')
let srcMusicAudio = []
let liveMusic

let imgRender = document.querySelector('.banner img')
let h1Render = document.querySelector('.play__body h1')
let pRender = document.querySelector('.play__body p')
let pauseBtnRender = document.querySelector('.fa-pause').parentElement
let playBtnRender = document.querySelector('.play__control .fa-play').parentElement
let bannerRender = document.querySelector('.play__body .banner .banner-ctn')
let repectBtnRender = document.querySelector('.btn .fas.fa-sync-alt')
let mixBtnRender = document.querySelector('.fas.fa-random')
let menuCloseRender = document.querySelector('.fas.fa-times')
let menuBtnRender = document.querySelector('.fas.fa-bars')
let nextBtnRender = document.querySelector('.fas.fa-forward')
let backBtnRender = document.querySelector('.fas.fa-backward')
let titleRander = document.querySelector('title')

fetch(restApi)
    .then((response) => {
        return response.json()
    })
    .then((arr) => {
        arr.forEach(item => {
            srcMusicAudio.push(item)
            menuRender.innerHTML += renderHtmlMenu(item)
        })
        return menuRender
    })
    .then(handleText)
    .then(handleStart)
    .catch(() => {
        srcMusicAudio = [
            {
                "id": 1,
                "name": "Lần Cuối",
                "singer": "Karik",
                "img": "./assets/data/img/LanCuoi.jpg",
                "audio": "./assets/data/music/Lần Cuối.mp3"
            },
            {
                "id": 2,
                "name": "Yêu Đơn Phương",
                "singer": "OnlyC, Karik",
                "img": "./assets/data/img/YeuDonPhuong.jpg",
                "audio": "./assets/data/music/Yêu Đơn Phương.mp3"
            },
            {
                "id": 3,
                "name": "Cho Tôi Lang Thang",
                "singer": "Ngọt, Đen",
                "img": "./assets/data/img/chotoilangthang.jfif",
                "audio": "./assets/data/music/Cho-Toi-Lang-Thang-Ngot-Den.mp3"
            },
            {
                "id": 4,
                "name": "Mình Từng Yêu Như Thế",
                "singer": "Karik, Orange",
                "img": "./assets/data/img/MinhTungYeuNhuThe.jpg",
                "audio": "./assets/data/music/MinhTungYeuNhuThe-KarikOrange-5473348.mp3"
            },
            {
                "id": 5,
                "name": "Người Lạ Ơi",
                "singer": "Karik, Orange, Superbrothers",
                "img": "./assets/data/img/NguoiLaOi.jpg",
                "audio": "./assets/data/music/Người Lạ Ơi.mp3"
            },
        ]
        srcMusicAudio.forEach((item) => { menuRender.innerHTML += renderHtmlMenu(item) })
        handleText(menuRender)
        handleStart()
    })

audioMusicRender.addEventListener('ended', () => {
    resetPlayerMusic()

    let isRepectAll = repectBtnRender.classList.contains('repect-all')
    let isRepectOne = repectBtnRender.classList.contains('repect-one')
    let isMix = mixBtnRender.classList.contains('active')
    let bolean = srcMusicAudio.indexOf(liveMusic) === srcMusicAudio.length - 1
    if (isRepectAll) {
        if (bolean) {
            autoNext(0)
        } else {
            autoNext(liveMusic.id)
        }
    } else if (isRepectOne) {
        autoNext(liveMusic.id - 1)
    } else if (isMix) {
        let ran
        do {
            ran = Math.floor(Math.random() * (srcMusicAudio.length - 1)) + 1
        } while (ran === liveMusic.id)
        autoNext(ran - 1)
    } else {
        if (!bolean) {
            autoNext(liveMusic.id)
        }
    }

    changePlayerMusic()
})

audioMusicRender.addEventListener('play', () => {
    resetPlayerMusic()

    titleRander.textContent = `Music: ${liveMusic.name} (${liveMusic.singer})`

    changePlayerMusic()
})

nextBtnRender.parentElement.addEventListener('click', () => {
    resetPlayerMusic()

    let bolean = srcMusicAudio.indexOf(liveMusic) === srcMusicAudio.length - 1
    let isMix = mixBtnRender.classList.contains('active')

    if (isMix) {
        let ran
        do {
            ran = Math.floor(Math.random() * (srcMusicAudio.length - 1)) + 1
        } while (ran === liveMusic.id)
        autoNext(ran - 1)
    } else
        if (bolean) {
            autoNext(0)
        } else {
            autoNext(liveMusic.id)
        }

    changePlayerMusic()
})

backBtnRender.parentElement.addEventListener('click', () => {
    resetPlayerMusic()

    let bolean = srcMusicAudio.indexOf(liveMusic) === 0
    let isMix = mixBtnRender.classList.contains('active')

    if (isMix) {
        let ran
        do {
            ran = Math.floor(Math.random() * (srcMusicAudio.length - 1)) + 1
        } while (ran === liveMusic.id)
        autoNext(ran - 1)
    } else
        if (bolean) {
            autoBack(srcMusicAudio.length + 1)
        } else {
            autoBack(liveMusic.id)
        }

    changePlayerMusic()
})

mixBtnRender.parentElement.addEventListener('click', () => {
    mixBtnRender.classList.toggle('active')
})

function handleText() {
    let textNames = menu.children
    for (let i = 1; i < textNames.length; i++) {
        let textName = textNames[i].children[2].children[1].children[0]
        if (textName.textContent.length > 20) {
            textNames[i].children[2].children[1].children[0].textContent = textNames[i].children[2].children[1].children[0].textContent.substring(0, 17) + '...'
        }
    }
}

function handleStart() {
    autoChange(Math.floor(Math.random() * (srcMusicAudio.length - 1)) + 1)
    let playerMusics = document.querySelectorAll('.player-music__item')

    setInterval(() => {
        playerMusics.forEach(item => {
            let ranH = Math.floor(Math.random() * 100)
            item.style.height = `${ranH}%`
        })
    }, 200)

    changePlayerMusic()
}

function resetPlayerMusic() {
    let onplay = document.querySelector(`#liveMusic${liveMusic.id}`)
    let outplay = document.querySelector(`[onclick="changeMusic(${liveMusic.id})"]`)
    let papa = outplay.parentElement
    outplay.style.display = 'flex'
    onplay.style.display = 'none'
    papa.classList.remove('live-music-auto')
}

function changePlayerMusic() {
    let onplay = document.querySelector(`#liveMusic${liveMusic.id}`)
    let outplay = document.querySelector(`[onclick="changeMusic(${liveMusic.id})"]`)
    let papa = outplay.parentElement
    outplay.style.display = 'none'
    onplay.style.display = 'flex'
    papa.classList.add('live-music-auto')
}

function autoNext(id) {
    liveMusic = srcMusicAudio.find(item => { return item.id === id + 1 })
    imgRender.src = liveMusic.img
    h1Render.textContent = liveMusic.name
    pRender.textContent = liveMusic.singer
    audioMusicRender.src = liveMusic.audio
    audioMusicRender.play()
    setTimeout(() => {
        pauseBtnRender.classList.add('open')
        playBtnRender.classList.remove('open')
        imgRender.classList.add('active-img')
        bannerRender.classList.add('active-ban')
    }, 100)
}

function autoBack(id) {
    liveMusic = srcMusicAudio.find(item => { return item.id === id - 1 })
    imgRender.src = liveMusic.img
    h1Render.textContent = liveMusic.name
    pRender.textContent = liveMusic.singer
    audioMusicRender.src = liveMusic.audio
    audioMusicRender.play()
    setTimeout(() => {
        pauseBtnRender.classList.add('open')
        playBtnRender.classList.remove('open')
        imgRender.classList.add('active-img')
        bannerRender.classList.add('active-ban')
    }, 100)
}

function renderHtmlMenu({ id, name, singer, img }) {
    return `
    <div class="menu__item">
        <div class="live-music" onclick="changeMusic(${id})">
            <i class="fas fa-play"></i>
        </div>
        <div class="player-music-ctn" id="liveMusic${id}">
            <div class="player-music">
                <div class="player-music__item"></div>
                <div class="player-music__item"></div>
                <div class="player-music__item"></div>
                <div class="player-music__item"></div>
            </div>
        </div>
        <div class="music__item">
            <img src="${img}" width="50px" alt="${name}">
            <div class="music__text">
                <h4 class="music-name">${name}</h4>
                <p>${singer}</p>
            </div>
        </div>
        <div class="music__set">
            <i class="fas fa-ellipsis-v"></i>
        </div>
    </div>
    `
}

function autoChange(id) {
    liveMusic = srcMusicAudio.find(item => { return item.id === id })
    imgRender.src = liveMusic.img
    h1Render.textContent = liveMusic.name
    pRender.textContent = liveMusic.singer
    audioMusicRender.src = liveMusic.audio
}

function changeMusic(id) {
    resetPlayerMusic()

    liveMusic = srcMusicAudio.find(item => { return item.id === id })
    imgRender.src = liveMusic.img
    h1Render.textContent = liveMusic.name
    pRender.textContent = liveMusic.singer
    audioMusicRender.src = liveMusic.audio
    audioMusicRender.play()
    playMusicRender()
    menuRender.classList.remove('open__menu')
    menuBtnRender.style.display = 'block'
    menuCloseRender.style.display = 'none'

    changePlayerMusic()
}

function playMusicRender() {
    audioMusic.play()
    playBtn.classList.remove('open')
    pauseBtn.classList.add('open')
    img.classList.add('active-img')
    banner.classList.add('active-ban')
}