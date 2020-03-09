
class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model) {
        throw new Error('O método template(model:Model): String não foi implementado.');
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}
