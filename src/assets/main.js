"use strict";


const mainSwiper = new Swiper('.main__swiper', {
  wrapperClass: 'main__swiper-wrapper',
  slideClass: 'main__slide',
  speed: 500,
  slidesPerView: 1,
  watchSlidesProgress: true,
  loop: true,

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
      delay: 6000,
      disableOnInteraction: false,
  },
  

});


const mainSwiperTwo = new Swiper('.main__swiper-two', {
    wrapperClass: 'main__swiper-wrapper-two',
    slideClass: 'main__slide-two',
    speed: 500,
    slidesPerView: 1,
    loop: true,
    freeMode: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },

    pagination: {
      el: ".main__swiper-two-pagination",
      type: "fraction",
      formatFractionCurrent: addZero,
      formatFractionTotal: addZero
    },


   
    
  
 });




 const swipeAllSliders = (index) => {
  mainSwiper.slideTo(index);
  mainSwiperTwo.slideTo(index);
  
};


mainSwiper.on('slideChange', () => swipeAllSliders(mainSwiper.activeIndex));
mainSwiperTwo.on('slideChange', () => swipeAllSliders(mainSwiperTwo.activeIndex));


//  mainSwiper.controller.control = mainSwiperTwo;
//  mainSwiperTwo.controller.control = mainSwiper;

//  mainSwiper.params.control = mainSwiperTwo;
//  mainSwiperTwo.params.control = mainSwiper;



 const swiperNav = new Swiper('.shooting__nav', {
    wrapperClass: 'shooting__nav-wrapper',
    slideClass: 'shooting__nav-slide ',  
    slidesPerView: 7,
    direction: 'vertical',
    watchSlidesProgress: true,
    freeMode: true,

    pagination: {
        
        clickable: true,
       
      }
  
 });

 const swiperShooting = new Swiper('.shooting__swiper', {
    wrapperClass: 'shooting__swiper-wrapper',
    slideClass: 'shooting__slide ',  
    slidesPerView: 1,
   
    
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },


    pagination: {
      el: ".shooting__bullets",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },


    thumbs: {
        swiper: swiperNav
      }
    
  
 });


 const bannerSwiper = new Swiper('.banner__swiper', {
  wrapperClass: 'banner__swiper-wrapper',
  slideClass: 'banner__slide',
  speed: 500,
  slidesPerView: 1,
  freeMode: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  autoplay: true,
  autoplay: {
      delay: 7000,
  },
  navigation: {
    prevEl: '.banner__prev',
    nextEl: '.banner__next',
  },

  pagination: {
    el: ".banner__fraction",
    type: "fraction",
    formatFractionCurrent: addZero,
    formatFractionTotal: addZero
  },
  

});


const blogSwiper = new Swiper('.blog__swiper', {
  wrapperClass: 'blog__swiper-wrapper',
  slideClass: 'blog__slide',
  speed: 500,
  slidesPerView: 4,
  navigation: {
    prevEl: '.blog__prev',
    nextEl: '.blog__next',
  },
  

  pagination: {
    el: ".blog__fraction",
    type: "fraction",
    formatFractionCurrent: addZero,
    formatFractionTotal: addZero
  },


});


const blogSwiperMob = new Swiper('.blog__swiper-mob', {
  wrapperClass: 'blog__swiper-wrapper-mob',
  slideClass: 'blog__slide-mob',
  speed: 500,
  slidesPerView: 1,
  navigation: {
    prevEl: '.blog__prev',
    nextEl: '.blog__next',
  },
  

  pagination: {
    el: ".blog__bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },


});



const modelsSwiper = new Swiper('.models__swiper', {
  wrapperClass: 'models__swiper-wrapper',
  slideClass: 'models__slide',
  speed: 500,

  slidesPerView: 2,
  slidesPerGroup: 2,
  grid: {
    rows: 2,
    fill: 'row',
  
  },
 

  pagination: {
    el: ".models__bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },

  breakpoints: {

    748: {
     
      slidesPerView: 6,
      slidesPerGroup: 6,
      grid: {
        rows: 2,
        fill: 'row',
    
      },

    },

  },
  
  

});





const entrySwiper = new Swiper('.entry__swiper', {
  wrapperClass: 'entry__swiper-wrapper',
  slideClass: 'entry__slide',
  speed: 500,
  slidesPerView: 1,
  watchSlidesProgress: true,

 
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
 
  autoplay: {
      delay: 6000,
      disableOnInteraction: false,
  },


  navigation: {
    prevEl: '.entry__prev',
    nextEl: '.entry__next',
  },
  

  pagination: {
    el: ".entry__fraction",
    type: "fraction",
    formatFractionCurrent: addZero,
    formatFractionTotal: addZero
  },



  

});


const entrySwiperTwo = new Swiper('.entry__swiper-two', {
    wrapperClass: 'entry__swiper-wrapper-two',
    slideClass: 'entry__slide-two',
    speed: 500,
    slidesPerView: 1,

  
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },


 

    pagination: {
      el: ".entry__swiper-two-pagination",
      type: "fraction",
      formatFractionCurrent: addZero,
      formatFractionTotal: addZero
    },


    thumbs: {
        swiper: entrySwiper
      }
    
  
 });




 const swipeAllSlidersEntry = (index) => {
  entrySwiper.slideTo(index);
  entrySwiperTwo.slideTo(index);
  
};


entrySwiper.on('slideChange', () => swipeAllSlidersEntry(entrySwiper.activeIndex));
entrySwiperTwo.on('slideChange', () => swipeAllSlidersEntry(entrySwiperTwo.activeIndex));









const swiperTypesModel = new Swiper('.types-model__swiper', {
  wrapperClass: 'types-model__swiper-wrapper',
  slideClass: 'types-model__slide ',  
  slidesPerView: 1,
  
  
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },


  pagination: {
    el: ".types-model__bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },



});

const entrySwiperImage = new Swiper('.entry__image-swiper', {
  wrapperClass: 'entry__image-swiper-wrapper',
  slideClass: 'entry__image-slide',
  speed: 500,
  slidesPerView: 1,
  initialSlide: 3,
  freeMode: true,
  autoplay: true,
  autoplay: {
      delay: 7000,
  },

 


  breakpoints: {

    748: {

      slidesPerView: 3,
      
    },

  },
 
  

});




const cardModelSwiper = new Swiper('.card-model__swiper', {
  wrapperClass: 'card-model__swiper-wrapper',
  slideClass: 'card-model__slide',
  speed: 500,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween:17,
  watchSlidesProgress: true,
  freeMode: true,

  navigation: {
    prevEl: '.card-model__prev',
    nextEl: '.card-model__next',
  },

  pagination: {
    el: ".card-model__fraction",
    type: "fraction",
    formatFractionCurrent: addZero,
    formatFractionTotal: addZero
  },

  breakpoints: {

    748: {

      slidesPerView: 3,
      slidesPerGroup: 3,
      
    },

  },
  

});



const cardModelSwiperMob = new Swiper('.card-model__mswiper', {
  wrapperClass: 'card-model__mswiper-wrapper',
  slideClass: 'card-model__mswiper-slide',
  speed: 500,
  slidesPerView: 3,
  spaceBetween:17,


  pagination: {
    el: ".card-model__bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },


  thumbs: {
      swiper: cardModelSwiper
    }

  

});

function addZero(num) {
  return (num > 9) ? num : '0' + num;
}

// ymaps.ready(function () {
//   var myMap = new ymaps.Map('map', {
//           center: [55.720702, 37.630104],
//           zoom: 9
//       }, {
//           searchControlProvider: 'yandex#search'
//       }),

//       // Создаём макет содержимого.
//       MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
//           '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
//       ),

//       myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
//           hintContent: 'Собственный значок метки',
//           balloonContent: 'Это красивая метка'
//       }, {
//           // Опции.
//           // Необходимо указать данный тип макета.
//           iconLayout: 'default#image',
//           // Своё изображение иконки метки.
//           iconImageHref: 'images/myIcon.gif',
//           // Размеры метки.
//           iconImageSize: [30, 42],
//           // Смещение левого верхнего угла иконки относительно
//           // её "ножки" (точки привязки).
//           iconImageOffset: [-5, -38]
//       }),

//       myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
//           hintContent: 'Собственный значок метки с контентом',
//           balloonContent: 'А эта — новогодняя',
//           iconContent: '12'
//       }, {
//           // Опции.
//           // Необходимо указать данный тип макета.
//           iconLayout: 'default#imageWithContent',
//           // Своё изображение иконки метки.
//           iconImageHref: 'images/ball.png',
//           // Размеры метки.
//           iconImageSize: [48, 48],
//           // Смещение левого верхнего угла иконки относительно
//           // её "ножки" (точки привязки).
//           iconImageOffset: [-24, -24],
//           // Смещение слоя с содержимым относительно слоя с картинкой.
//           iconContentOffset: [15, 15],
//           // Макет содержимого.
//           iconContentLayout: MyIconContentLayout
//       });

//   myMap.geoObjects
//       .add(myPlacemark)
//       .add(myPlacemarkWithContent);
// });


document.querySelectorAll('.card-model__date-table').forEach((n, i, a) => {
  n.addEventListener('click', () => a.forEach(m => m.classList.toggle('active', m === n)));
});
