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
    more.addEventListener('click', () => {
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
        mainInputs = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        compactForm = document.querySelector('#form'),
        compactInputs = compactForm.getElementsByTagName('input');
    statusMessage.classList.add('status');
    mainForm.addEventListener('submit', () => {
        setupRequest.call(this, mainForm, mainInputs);
    });
    //Compact form- AJAX
    compactForm.addEventListener('submit', () => {
        setupRequest.call(this, compactForm, compactInputs);
    });

    function setupRequest(form, inputs) {
        event.preventDefault();
        form.appendChild(statusMessage);
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        let formData = new FormData(compactForm);
        let obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        request.send(json);
        request.addEventListener('readystatechange', () => {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState == 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }
});