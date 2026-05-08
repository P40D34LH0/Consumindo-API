async function consumirAPI() {

    const cep = document.getElementById('cep').value;

    if (cep.length < 8) {
        alert("Informe no máximo 8 números");
        return;
    }

    try {

        const respose = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        const dados = await respose.json();

        if(dados.erro){
            alerto("CEP não encontrado");
            return;
        }

        document.getElementById('logradouro').value = dados.logradouro;
        document.getElementById('complemento').value = dados.complemento;
        document.getElementById('unidade').value = dados.unidade;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('localidade').value = dados.localidade;
        document.getElementById('uf').value = dados.uf;
        document.getElementById('estado').value = dados.estado;
        document.getElementById('regiao').value = dados.regiao;
        document.getElementById('ibge').value = dados.ibge;
        document.getElementById('gia').value = dados.gia;
        document.getElementById('ddd').value = dados.ddd;
        document.getElementById('siafi').value = dados.siafi;

    } catch (error) {
        console.error(error);
    }

}

consumirAPI()