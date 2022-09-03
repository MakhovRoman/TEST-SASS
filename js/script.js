"use strict";

const burger = document.querySelector('.burger');
const burgerButton = burger.querySelector('.burger__button');
burger.addEventListener('click', (e) => burgerButton.classList.toggle('burger__button_active'));

function makeSlider() {
  let slider = document.querySelector('.slider__content');
  let sliderItems = Array.from(slider.children);

  slider.style.width = `${100 * sliderItems.length}%`;
  sliderItems.forEach((item, index, arr) => item.style.width = `${parseInt(getComputedStyle(slider).width) / arr.length}%`);
}

makeSlider();
