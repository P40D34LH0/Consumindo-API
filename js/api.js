const WEATHER_API_KEY = '6aeda8bf270952329296c7127ec595c5'; 
let taxaDolar = 0;

async function buscarClima() {
    const cidade = document.getElementById('cidade-input').value || 'Sao Paulo';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.cod === 200) {
            document.getElementById('resultado-clima').innerHTML = `
                <p style="font-size: 1.4rem; color: #f1c40f;">${data.name}, ${data.sys.country}</p>
                <p><strong>${data.main.temp}°C</strong> - ${data.weather[0].description}</p>
                <p>Umidade: ${data.main.humidity}% | Vento: ${data.wind.speed}km/h</p>
            `;
        } else {
            document.getElementById('resultado-clima').innerHTML = "<p>Cidade não encontrada.</p>";
        }
    } catch (e) {
        document.getElementById('resultado-clima').innerHTML = "<p>Erro de conexão.</p>";
    }
}

async function buscarCotacao() {
    try {
        const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
        const data = await res.json();
        taxaDolar = parseFloat(data.USDBRL.bid);
        document.getElementById('valor-dolar').innerHTML = `1 Dólar hoje vale: <strong>R$ ${taxaDolar.toFixed(2)}</strong>`;
    } catch (e) { console.error("Erro ao buscar dólar"); }
}

function converterParaDolar() {
    const valor = document.getElementById('input-real').value;
    if (valor && taxaDolar) {
        const res = valor / taxaDolar;
        document.getElementById('res-dolar').innerText = `Valor em Dólar: US$ ${res.toFixed(2)}`;
    }
}

function converterParaReal() {
    const valor = document.getElementById('input-dolar').value;
    if (valor && taxaDolar) {
        const res = valor * taxaDolar;
        document.getElementById('res-real').innerText = `Valor em Real: R$ ${res.toFixed(2)}`;
    }
}

async function buscarDadosPais() {
    const nome = document.getElementById('pais-input').value;
    if (!nome) return;

    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${nome}`);
        const data = await res.json();
        
        if (data.status === 404) {
            document.getElementById('info-pais').innerHTML = "<p>País não encontrado.</p>";
            return;
        }

        const p = data[0];
        document.getElementById('info-pais').innerHTML = `
            <img src="${p.flags.svg}" class="flag-img" alt="Bandeira">
            <p><strong>Nome:</strong> ${p.name.common}</p>
            <p><strong>Capital:</strong> ${p.capital ? p.capital[0] : 'N/A'}</p>
            <p><strong>Continente:</strong> ${p.continents[0]}</p>
            <p><strong>População:</strong> ${p.population.toLocaleString()}</p>
        `;
    } catch (e) {
        document.getElementById('info-pais').innerHTML = "<p>Erro ao buscar país.</p>";
    }
}

async function carregarCachorro() {
    try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        const img = document.getElementById('dog-image');
        img.src = data.message;
        img.style.display = 'inline-block';
    } catch (e) { console.error("Erro dog"); }
}

window.onload = () => {
    buscarCotacao();
    carregarCachorro();
    buscarClima();
};