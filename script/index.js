window.addEventListener("load", () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }
});

let loader = document.querySelector(".loader");
window.addEventListener("load", vanish);
function vanish() {
  loader.classList.add("disppear");
}

let checkbox = document.querySelector('input[name=theme]');
let mode;

window.onload = function() {
    if (localStorage.noFirstVisit) {
        const modeOnLoad = localStorage.getItem('mode');
        const country = localStorage.getItem('coutry');
        document.documentElement.setAttribute('data-theme', modeOnLoad);
        if (modeOnLoad == 'dark') {
            document.getElementById("modeWindow").checked = true;
            document.getElementById('labelMode').innerHTML = '<i class="bi bi-moon-fill"></i>'
        }
        loadChannels(country);
    }
    document.getElementById('channel-section').classList.add('show')
}

checkbox.addEventListener('change', function() {
    if(this.checked) {
        mode = 'dark'
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
        document.getElementById('labelMode').innerHTML = '<i class="bi bi-moon-fill"></i>'
    } else {
        mode = 'light'
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
        document.getElementById('labelMode').innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
    }
    localStorage.setItem('mode', mode);
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

let modalToggle = document.getElementById('staticBackdrop');
let selectCountry = document.getElementById("selectCountry");
modalToggle.addEventListener('hide.bs.modal', function () {
    let valueCountry = selectCountry.value;
    localStorage.setItem('coutry', valueCountry);
})

let channelsItaly = [
    ['Rai 1', 'https://mediapolis.rai.it/relinker/relinkerServlet.htm?cont=2606803', './tv/italy/rai-1.jpg'],
    ['Rai 2', 'https://mediapolis.rai.it/relinker/relinkerServlet.htm?cont=308718', './tv/italy/rai-2.jpg'],
    ['Rai 3', 'https://mediapolis.rai.it/relinker/relinkerServlet.htm?cont=308709', './tv/italy/rai-3.jpg'],
    ['Rete 4', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(r4)/index.m3u8', './tv/italy/rete-4.jpg'],
    ['Canale 5', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(c5)/index.m3u8', './tv/italy/canale-5.jpg'],
    ['Italia 1', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(i1)/index.m3u8', './tv/italy/italia-1.jpg'],
    ['Nove', 'https://sbshdlu5-lh.akamaihd.net/i/sbshdl_3@810997/master.m3u8', './tv/italy/nove.jpg'],
    ['20', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(lb)/index.m3u8', './tv/italy/20.jpg'],
    ['Rai 4', '', './tv/italy/rai-4.jpg'],
    ['Iris', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(ki)/index.m3u8', './tv/italy/iris.jpg'],
    ['Rai 5', '', './tv/italy/rai-5.jpg'],
    ['Rai Movie', '', './tv/italy/rai-movie.jpg'],
    ['Rai Premium', '', './tv/italy/rai-premium.jpg'],
    ['Paramount Network', 'https://viacomitalytest-lh.akamaihd.net/i/sbshdlive_1@195657/master.m3u8', './tv/italy/paramount-network.jpg'],
    ['TV2000', 'https://cldwz.tv2000.it/tv2000_main.m3u8', './tv/italy/tv2000.jpg'],
    ['La 5', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(ka)/index.m3u8', './tv/italy/la-5.jpg'],
    ['Real Time', 'https://sbshdlu5-lh.akamaihd.net/i/sbshdl_4@810998/master.m3u8', './tv/italy/real-time.jpg', './tv/italy/real-time.jpg'],
    ['QVC', 'https://qrg.akamaized.net/hls/live/2017383/lsqvc1it/master.m3u8', './tv/italy/qvc.jpg'],
    ['Food Network', 'https://sbshdlu5-lh.akamaihd.net/i/sbshdl_6@1000854/master.m3u8', './tv/italy/food-network.jpg'],
    ['Cine34', 'https://live3-radio-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(b6)/index.m3u8', './tv/italy/cine-34.jpg'],
    ['Focus', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(fu)/index.m3u8', './tv/italy/focus.jpg'],
    ['RTL 102.5', 'https://rtl-video1-stream.thron.com/live-video/video1/ngrp:video1/playlist.m3u8', './tv/italy/rtl.jpg'],
    ['GM24', 'https://5f11919dca3bd.streamlock.net/HSE24/HSE24/playlist.m3u8', './tv/italy/gm24.jpg'],
    ['Giallo', 'https://sbshdlu5-lh.akamaihd.net/i/sbshdl_2@810996/master.m3u8', './tv/italy/giallo.jpg'],
    ['Top Crime', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(lt)/index.m3u8', './tv/italy/top-crime.jpg'],
    ['Boing', 'https://live3.msf.cdn.mediaset.net/Content/hls_h0_clr_vos/live/channel(kb)/index.m3u8', './tv/italy/boing.jpg'],
    ['Rai Gulp', '', './tv/italy/rai-gulp.jpg'],
    ['Rai Yoyo', '', './tv/italy/rai-yoyo.jpg'],
    ['Cartoonito', 'https://live3.msf.cdn.mediaset.net/Content/hls_h0_clr_vos/live/channel(la)/index.m3u8', './tv/italy/cartoonito.jpg'],
    ['Super!', 'https://viacomitalytest-lh.akamaihd.net/i/sbshdlive_1@357018/master.m3u8', './tv/italy/super.jpg'],
    ['Rai News 24', '', './tv/italy/rai-news-24.jpg'],
    ['Spike', 'https://viacomitalytest-lh.akamaihd.net/i/sbshdlive_1@829515/master.m3u8', './tv/italy/spike.jpg'],
    ['Sky TG24', ''],
    ['TGCOM 24', 'https://live3-radio-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(KF)/index.m3u8', './tv/italy/tgcom24.jpg'],
    ['Dmax', 'https://sbshdlu5-lh.akamaihd.net/i/sbshdl_5@825063/master.m3u8', './tv/italy/dmax.jpg'],
    ['Rai Storia', '', './tv/italy/rai-storia.jpg'],
    ['Mediaset Extra', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(kq)/index.m3u8', './tv/italy/mediaset-extra.jpg'],
    ['Rai Sport +', '', './tv/italy/rai-sport.jpg'],
    ['Motor Trend', 'https://sbshdlu5-lh.akamaihd.net/i/sbshdl_1@810993/master.m3u8', './tv/italy/motor-trend.jpg'],
    ['Italia 2', 'https://live3-mediaset-it.akamaized.net/Content/hls_h0_clr_vos/live/channel(i2)/index.m3u8'],
    ['VH1', 'https://content.uplynk.com/channel/36953f5b6546464590d2fcd954bc89cf.m3u8'],
    ['Deejay TV', 'https://deejay-tv-lh.akamaized.net/i/DeejayTv_1@129866/master.m3u8'],
    ['RadioItaliaTV', 'https://radioitaliatv-lh.akamaihd.net/i/radioitaliatv_1@329645/master.m3u8'],
    ['Rai Scuola', ''],
    ['Radio 105 TV', 'https://live3.msf.cdn.mediaset.net/Content/hls_h0_clr_vos/live/channel(EC)/index.m3u8'],
    ['RADIO KISS KISS TV', 'https://59253971be783.streamlock.net/KissKissTV/KissKissTV.stream/playlist.m3u8'],
    ['R101 TV', 'https://live3.msf.cdn.mediaset.net/Content/hls_h0_clr_vos/live/channel(ER)/index.m3u8'],
    ['VIRGIN RADIO', 'https://live3.msf.cdn.mediaset.net/Content/hls_h0_clr_vos/live/channel(EW)/index.m3u8'],
    ['RADIOFRECCIA', 'https://rtl-video2-stream.thron.com/live-video/video2/ngrp:video2/playlist.m3u8'],
    ['RDS Social TV', 'https://stream.rdstv.radio/out/v1/ec85f72b87f04555aa41d616d5be41dc/index.m3u8'],
    ['RADIO ZETA', 'https://rtl-video3-stream.thron.com/live-video/video3/ngrp:video3/playlist.m3u8'],
    ['Radio Montecarlo TV', 'https://live3.msf.cdn.mediaset.net/Content/hls_h0_clr_vos/live/channel(BB)/index.m3u8'],

]

const channelsSection = document.getElementById('channel-section');
const channelsDiv = document.getElementById('channels');
const settingsSection = document.getElementById('settings-section');
const video = document.querySelector('video');
const titleVideo = document.getElementById('channel-label');

function loadChannels(country) {
    if (country == 'Italy') {
        for (let i = 0; i < channelsItaly.length; i++) {
            let backgroundButton = document.createElement('div');
            backgroundButton.className = 'channel-select';
            backgroundButton.setAttribute('data-bs-toggle', 'modal');
            backgroundButton.setAttribute('data-bs-target', '#stream-modal');
            backgroundButton.onclick = function() {
                titleVideo.innerHTML = channelsItaly[i][0];
                video.src = channelsItaly[i][1];
                video.play();
            }
            const image = document.createElement('img');
            image.src = channelsItaly[i][2];
            image.alt = channelsItaly[i][0];
            backgroundButton.appendChild(image);
            channelsDiv.appendChild(backgroundButton);
        }
    }
}

function content(page) {
    if (page == 'home') {
        channelsSection.style.display = "flex";
        settingsSection.style.display = 'none';
    }
    else if (page == 'settings') {
        settingsSection.style.display = 'block';
        channelsSection.style.display = 'none'
    }
}