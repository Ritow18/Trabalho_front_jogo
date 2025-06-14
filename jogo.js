document.addEventListener('DOMContentLoaded', () => {
    const mapaCores = {
        '#cfd8dc': 'Azul Claro Cinzento',
        '#b0bec5': 'Azul Cinzento',
        '#90a4ae': 'Azul Médio Cinzento',
        '#78909c': 'Azul Escuro Cinzento',
        '#607d8b': 'Azul Mais Escuro Cinzento',
        '#455a64': 'Azul Quase Preto Cinzento',
        '#37474f': 'Azul Preto Cinzento'
    };

    const nomesCores = Object.values(mapaCores);
    const hashesCores = Object.keys(mapaCores);

    let hashCorCorretaAtual;
    let nomeCorCorretaAtual;
    let contagemTentativas = 0;

    const containerBotoesPalpite = document.getElementById('containerBotoesPalpite');
    const botaoReiniciar = document.getElementById('botaoReiniciar');
    const exibirMensagem = document.getElementById('exibirMensagem');
    const nomeCorReal = document.getElementById('nomeCorReal');
    const contagemTentativasElemento = document.getElementById('contagemTentativas');
    const corpo = document.body;

    function selecionarCorAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * hashesCores.length);
        hashCorCorretaAtual = hashesCores[indiceAleatorio];
        nomeCorCorretaAtual = mapaCores[hashCorCorretaAtual];
    }

    function atualizarExibicao(mensagem = '') {
        contagemTentativasElemento.innerText = contagemTentativas;
        exibirMensagem.innerText = mensagem;
    }

    function criarBotoesPalpite() {
        containerBotoesPalpite.innerHTML = '';
        const nomesCoresParaExibir = [...nomesCores]; 
        nomesCoresParaExibir.forEach(nome => { 
            const botao = document.createElement('button');
            botao.innerText = nome;
            botao.classList.add('botao-palpite');
            botao.dataset.nomeCor = nome;

            botao.addEventListener('click', (evento) => {
                lidarComPalpite(evento.target.dataset.nomeCor);
            });
            containerBotoesPalpite.appendChild(botao);
        });
    }

    function lidarComPalpite(nomeCorPalpite) {
        contagemTentativas++;
        atualizarExibicao();

        if (nomeCorPalpite.toLowerCase() === nomeCorCorretaAtual.toLowerCase()) {
            corpo.style.backgroundColor = hashCorCorretaAtual;
            nomeCorReal.innerText = nomeCorCorretaAtual;
            exibirMensagem.style.color = 'green';
            atualizarExibicao(`Parabéns! Você acertou a cor em ${contagemTentativas} tentativa(s)!`);
            desabilitarBotoesPalpite(true);
            botaoReiniciar.style.display = 'inline-block';
        } else {
            exibirMensagem.style.color = 'red';
            atualizarExibicao('Ops! Você errou. Tente novamente!');
            selecionarCorAleatoria();
        }
    }

    function desabilitarBotoesPalpite(estaDesabilitado) {
        const botoes = containerBotoesPalpite.querySelectorAll('.botao-palpite');
        botoes.forEach(botao => {
            botao.disabled = estaDesabilitado;
            if (estaDesabilitado) {
                botao.style.cursor = 'not-allowed';
            } else {    
                botao.style.cursor = 'pointer';
            }
        });
    }

    function embaralharArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function iniciarJogo() {
        contagemTentativas = 0;
        selecionarCorAleatoria();
        atualizarExibicao('');
        nomeCorReal.innerText = '??';
        criarBotoesPalpite();
        desabilitarBotoesPalpite(false);
    }
    botaoReiniciar.addEventListener('click', iniciarJogo);
    iniciarJogo();
});  
