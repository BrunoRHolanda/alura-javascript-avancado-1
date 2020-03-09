
class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
 
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._mensagem = new Mensagem();
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacaoView($('#negociacoesView'));
        this._mensagemView = new MensagemView($('#mensagem'));

        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagemView.update(this._mensagem);
    }

    adicionar(event) {
        event.preventDefault();

        let negociacao = new Negociacao(
            DateHelper.toDate(this._inputData.value), 
            this._inputQuantidade.value, 
            this._inputValor.value
        );

        this._listaNegociacoes.add(negociacao);
        this._mensagem.texto = 'Adicionada com sucesso!';
        this._limpaFormulario();
        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagemView.update(this._mensagem);

        console.log(this._listaNegociacoes.negociacoes);
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}
