window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let tab = document.querySelectorAll(".info-header-tab"),
        infoTab = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    infoTab.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //TIMER

    let deadline = '2019-05-03';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        if (seconds.toString().length == 1) {
            seconds = "0" + seconds;
        } else if (minutes.toString().length == 1) {
            minutes = "0" + minutes;
        } else if (hours.toString().length == 1) {
            hours = "0" + hours;
        }
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('timer', deadline);

    //MODAL
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        info = document.querySelector('.info');
    more.addEventListener('click', function() {
        showModalWindow.call(this);
    });
    info.addEventListener('click', (event) => {
        let target = event.target;
        if (!target.classList.contains('description-btn')) return;
        showModalWindow.call(target);
    });
    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    function showModalWindow() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    //Form - AJAX
    let message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так..."
    };
    let mainForm = document.querySelector('.main-form'),
        mainInputs = mainForm.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        compactForm = document.querySelector('#form'),
        compactInputs = compactForm.getElementsByTagName('input');
    statusMessage.classList.add('status');

    function sendForm(elem, inputs) {
        elem.addEventListener('submit', (event) => {
            event.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);
            let obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            function postData(data) {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    request.send(data);
                    request.addEventListener('readystatechange', () => {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState == 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });

            }

            function clearInputs(inputs) {
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = '';
                }
            }
            postData(json).then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInputs(inputs));
        });
    }
    sendForm(mainForm, mainInputs);
    sendForm(compactForm, compactInputs);

    //Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    });
    dotsWrap.addEventListener('click', (event) => {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });
    //Calculator

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });
    restDays.addEventListener('change', function () {
        if (persons.value == '' || restDays.value == '') {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });
    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});