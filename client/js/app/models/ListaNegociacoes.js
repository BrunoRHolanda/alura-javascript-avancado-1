
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

    flush() {
        this._negociacoes.length = 0;
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, negociacao) => total += negociacao.volume, 0)
    }
}
