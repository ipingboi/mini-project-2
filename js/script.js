const global = {
    currentPage: window.location.pathname,
  
    api: {
      apiUrl: 'https://kitsu.io/api/edge/',
    },
  };
  
  //Swiper
  async function displaySlider() {
    const results = await fetchAPIData('trending/anime');
  
    const anime = results.data;
  
    anime.forEach((anime) => {
      const div = document.createElement('div');
      div.classList.add('swiper-slide');
  
      div.innerHTML = `
          <a href="#">
            <img src="${anime.attributes.posterImage.large}"
              alt="${anime.attributes.canonicalTitle}"/>
          </a>
          <h5 class="anime-title color">
          ${anime.attributes.canonicalTitle}
              </h5>
          `;
  
      document.querySelector('.swiper-wrapper').appendChild(div);
  
      initSwiper();
    });
  }

//   New Episodes\

  
  function initSwiper() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }

  // Fetch new anime

  async function displayTrendingAnime() {
    const results = await fetchAPIData('trending/anime');

    const anime = results.data;
  
    anime.forEach((anime) => {
      const div = document.createElement('div');
      div.classList.add('.slider-inner');
  
      div.innerHTML = `
      <div class="slider-inner__card">
            <img class="slider-inner__img" src="${anime.attributes.posterImage.small}">
          </div>`
  
      document.querySelector('.slider-inner').appendChild(div);
    
    });
  }
  
  //Fetch data from the API
  async function fetchAPIData(endpoint) {
    const API_URL = global.api.apiUrl;
  
    const response = await fetch(`${API_URL}${endpoint}`);
  
    const data = await response.json();
  
    return data;
  }

  // Fetch top anime

  async function displayTopAnime() {
    const results = await fetchAPIData('trending/anime');

    const anime = results.data;
  
    anime.forEach((anime) => {
      const div = document.createElement('div');
      div.classList.add('.slider-inner');
  
      div.innerHTML = `
      <div class="slider-inner__card">
            <img class="slider-inner__img" src="${anime.attributes.posterImage.small}">
          </div>`
  
      document.querySelector('.slider-inner').appendChild(div);
    
    });
  }
  
  //Init
  function init() {
    switch (global.currentPage) {
      case '/':
      case '/index.html':
        displaySlider();
        displayTrendingAnime();
        displayTopAnime();
        break;
    }
  }
  
  const toggler = document.querySelector(".btn");
toggler.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
});

  document.addEventListener('DOMContentLoaded', init);
  
  // Arrows

  document.addEventListener("click", e => {
    let handle
    if (e.target.matches(".slider-control")) {
      handle = e.target
    } else {
      handle = e.target.closest(".slider-control")
    }
    if (handle != null) onHandleClick(handle)
  })
  
  function onHandleClick(handle) {
    const items = document.querySelectorAll('.slider-inner__card')
    const maxItems = items.length
    const itemsPerScreen = Math.ceil(maxItems / 4) - 1;
  
    const slider = handle.closest(".slider-wrap").querySelector(".slider-inner")
    const sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue("--slider-index")
    )
  
    if (handle.classList.contains("control-prev")) {
      if (sliderIndex > 0){
        slider.style.setProperty("--slider-index", sliderIndex - 1)
      }
    } else {
      if (sliderIndex >= itemsPerScreen) {
        slider.style.setProperty("--slider-index", 0)
      } else {
        slider.style.setProperty("--slider-index", sliderIndex + 1)
      }
    }
  }