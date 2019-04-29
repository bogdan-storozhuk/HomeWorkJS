let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
    function convertValue() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();
            request.addEventListener('readystatechange', function () {
                if (request.readyState === 4 && request.status == 200) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }
    convertValue()
        .then(() => {
            let data = JSON.parse(request.response);
            inputUsd.value = inputRub.value / data.usd;
        })
        .reject(()=>inputUsd.value = "Что-то пошло не так!");
});