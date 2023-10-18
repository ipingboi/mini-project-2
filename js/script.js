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

  // Fetch trending anime

  async function displayTrendingAnime() {
    const results = await fetchAPIData('trending/anime');

    const anime = results.data;
  
    anime.forEach((anime) => {
      const div = document.createElement('div');
      div.classList.add('.box');
  
      div.innerHTML = `
      <div class="box">
      <a href=""><img src="${anime.attributes.posterImage.small}" alt=""></a>
      </div>
          `;
  
      document.querySelector('.episodes').appendChild(div)
    });
  }
  
  //Fetch data from the API
  async function fetchAPIData(endpoint) {
    const API_URL = global.api.apiUrl;
  
    const response = await fetch(`${API_URL}${endpoint}`);
  
    const data = await response.json();
  
    return data;
  }
  
  //Init
  function init() {
    switch (global.currentPage) {
      case '/':
      case '/index.html':
        displaySlider();
        displayTrendingAnime();
        break;
    }
  }
  
  const toggler = document.querySelector(".btn");
toggler.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
});

  document.addEventListener('DOMContentLoaded', init);
  