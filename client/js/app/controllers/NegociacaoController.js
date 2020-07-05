
class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
 
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], (model) => {
            this._mensagemView.update(model);
        });

        this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['add', 'flush'], (model) => { 
            this._negociacoesView.update(model); 
        });
 
        this._negociacoesView = new NegociacaoView($('#negociacoesView'));
        this._mensagemView = new MensagemView($('#mensagem'));

        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagemView.update(this._mensagem);

        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _init() {
        this._negociacaoService
            .listar()
            .then(negociacoes => {
                negociacoes.forEach( negociacao => {
                    this._listaNegociacoes.add(negociacao);
                });
            })
            .catch(erro => this._mensagem.texto = erro);

       setInterval(() => this.importarNegociacao(), 3000);
    }

    adicionar(event) {
        event.preventDefault();
        
        let negociacao = new Negociacao(
            DateHelper.toDate(this._inputData.value), 
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value)
        );

        this._negociacaoService
            .cadastrar(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.add(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
 
    apagar(event) {
        event.preventDefault();

        this._negociacaoService
            .apagar()
            .then((mensagem) => {
                this._listaNegociacoes.flush();
                this._mensagem.texto = mensagem;
            })
            .catch((error) => this._mensagem.texto = error)
    }

    importarNegociacao() {

        this._negociacaoService
        .obterNegociacoes()
        .then(negociacoes =>
            negociacoes.filter(negociacao =>
                !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                    JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
        ).then( negociacoes => {
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => {
                    this._listaNegociacoes.add(negociacao);
                });
            this._mensagem.texto = "Negociaçoes importadas com sucesso!";
        }).catch( error => this._mensagem.texto = error);
    }
}
