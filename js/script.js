"use strict";

const burger = document.querySelector('.burger');
const burgerButton = burger.querySelector('.burger__button');
burger.addEventListener('click', (e) => burgerButton.classList.toggle('burger__button_active'));

function makeSlider() {
  let slider = document.querySelector('.slider__content');
  let sliderItems = Array.from(slider.children);

  slider.style.width = `${100 * sliderItems.length}%`;
  sliderItems.forEach((item, index, arr) => item.style.width = `${parseInt(getComputedStyle(slider).width) / arr.length}px`);
}

class Slider {
  constructor(title) {
    this.slider = document.querySelector(`.${title}`);
    this.buttons = document.querySelectorAll(`.${title.split('__')[0]}__control`);
    this.sliderItems = Array.from(this.slider.children);
    this.sliderArea = document.querySelector(`.${title.split('__')[0]}__wrapper`).clientWidth;
    this.sliderArray = [];
    this.count = 0;
  }

  setSliderWidth() {
    this.slider.style.width = `${100 * this.sliderItems.length}%`;
    this.sliderItems.forEach((item, index, arr) => item.style.width = `${parseInt(getComputedStyle(this.slider).width) / arr.length}px`);
  }

  makeSliderObjArray() {
    let current, prev, next;

    for (let i = 0; i < this.sliderItems.length; i++) {
      current = this.sliderItems[i];

      prev   = this.sliderItems[i-1];
      if (i == 0) prev = this.sliderItems[this.sliderItems.length - 1];

      next   = this.sliderItems[i+1];
      if (i == this.sliderItems.length - 1) next = this.sliderItems[0];

      this.sliderArray.push({currentEl: current, prevEl: prev, nextEl: next});
    }
  }

  setSliderInLine() {
    for(let i = 0; i < this.sliderItems.length; i++) {
      this.sliderItems[i].style.transform = `translateX(${i * this.sliderArea}px)`
    }
  }

  movingSlider(target) {
    target.currentEl.style.transform = `translateX(0%)`;
    target.currentEl.style.opacity = 1;
    target.prevEl.style.transform = `translateX(-200%)`;
    target.prevEl.style.opacity = 0;
    target.nextEl.style.transform = `translateX(200%)`;
    target.nextEl.style.opacity = 0;
  }

  countForward() {
    this.count++;

    if (this.count == this.sliderArray.length) this.count = 0;
    if (this.count < 0) this.count = this.sliderArray.length - 1;

    return this.count;
  }

  countBackward() {
    this.count--;

    if (this.count == this.sliderArray.length) this.count = 0;
    if (this.count < 0) this.count = this.sliderArray.length - 1;

    return this.count;
  }

  buttonsAddEventListener() {
    this.buttons.forEach(item => item.addEventListener('click', e => {
      if(e.target.classList.contains('control__forward') || e.target.classList.contains('forward__img')) {
        console.log(e.target);
        this.countForward();
      } else if(e.target.classList.contains('control__backward') || e.target.classList.contains('backward__img')) {
        this.countBackward();
      }

      this.movingSlider(this.sliderArray[this.count]);
    }))
  }
}

let sliderTop = new Slider('slider__content');
sliderTop.setSliderWidth();
sliderTop.setSliderInLine();
sliderTop.makeSliderObjArray();
sliderTop.buttonsAddEventListener();

//makeSlider();
