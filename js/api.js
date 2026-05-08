let taxaDolar = 0;

async function buscarCotacao() {
    const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL";
    try {
        const response = await fetch(url);
        const data = await response.json();
        taxaDolar = parseFloat(data.USDBRL.bid);
        
        document.getElementById('valor-dolar').innerHTML = `
            Cotação Atual: <strong>R$ ${taxaDolar.toFixed(2)}</strong>
        `;
    } catch (error) {
        console.error("Erro ao buscar cotação");
    }
}

function converterParaDolar() {
    const real = document.getElementById('input-real').value;
    if (real && taxaDolar > 0) {
        const resultado = real / taxaDolar;
        document.getElementById('res-dolar').innerText = `US$ ${resultado.toFixed(2)}`;
    }
}

function converterParaReal() {
    const dolar = document.getElementById('input-dolar').value;
    if (dolar && taxaDolar > 0) {
        const resultado = dolar * taxaDolar;
        document.getElementById('res-real').innerText = `R$ ${resultado.toFixed(2)}`;
    }
}

async function carregarCachorro() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    const img = document.getElementById('dog-image');
    img.src = data.message;
    img.style.display = 'block';
}

async function buscarDadosPais() {
    const response = await fetch("https://restcountries.com/v3.1/name/brazil");
    const data = await response.json();
    const p = data[0];
    document.getElementById('info-pais').innerHTML = `
        <p><strong>${p.name.common}</strong> - ${p.capital[0]}</p>
        <img src="${p.flags.svg}" width="80">
    `;
}

window.onload = () => {
    buscarCotacao();
    carregarCachorro();
    buscarDadosPais();
};