
class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    get negociacoes() {
        return [...this._negociacoes];
    }

    add(negociacao) {
        this._negociacoes.push(negociacao);
    }
}
