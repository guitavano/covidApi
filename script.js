let confirmed = document.querySelector('#cases p')
let deaths = document.querySelector('#deaths p')



function getCurrentDate() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;
    document.querySelector('.data p').textContent = dataAtual
}

getCurrentDate();

function apiXhr(country) {
    let response = ""
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            response = this.responseText
            response = JSON.parse(response)
            let info = response[response.length - 1]
            confirmed.textContent = parseInt(info['Confirmed']).toLocaleString('pt-BR')
            deaths.textContent = parseInt(info['Deaths']).toLocaleString('pt-BR')
        }
    });

    let url = "https://api.covid19api.com/total/country/" + country

    xhr.open("GET", url);

    xhr.send();

    let countrys = document.querySelectorAll('.paises ul li')
    for (c of countrys) {
        c.style.color = "white"
    }
    document.querySelector('#' + country).style.color = "#2196f3"
}

function apiFetch(country) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let url = "https://api.covid19api.com/total/country/" + country

    fetch(url, requestOptions)
        .then(function (response) {
            response.text()
                .then(function (result) {
                    result = JSON.parse(result)
                    let info = result[result.length - 1]
                    confirmed.textContent = parseInt(info['Confirmed']).toLocaleString('pt-BR')
                    deaths.textContent = parseInt(info['Deaths']).toLocaleString('pt-BR')
                })
        })
        .catch(error => console.log('error', error));

    let countrys = document.querySelectorAll('.paises ul li')
    for (c of countrys) {
        c.style.color = "white"
    }
    document.querySelector('#' + country).style.color = "#2196f3"
}

function apiJquery(country) {
    let url = "https://api.covid19api.com/total/country/" + country

    var settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        let info = response[response.length - 1]
        confirmed.textContent = parseInt(info['Confirmed']).toLocaleString('pt-BR')
        deaths.textContent = parseInt(info['Deaths']).toLocaleString('pt-BR')
    });

    let countrys = document.querySelectorAll('.paises ul li')
    for (c of countrys) {
        c.style.color = "white"
    }
    document.querySelector('#' + country).style.color = "#2196f3"
}
