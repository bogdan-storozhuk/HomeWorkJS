let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
    function convertValue() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();
            request.addEventListener('load', function () {
                if (request.readyState === 4 && request.status == 200) {
                    resolve(request.response);
                } else {
                    reject();
                }
            });
        });
    }
    convertValue()
        .then((value) => {
            let data = JSON.parse(value);
            inputUsd.value = inputRub.value / data.usd;
        })
        .catch(()=>inputUsd.value = "Что-то пошло не так!");
});