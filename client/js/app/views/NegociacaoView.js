
class NegociacaoView extends View {

    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
            </thead>
    
            <tbody>
                ${model.negociacoes.map((negociacao) =>
                    `
                        <tr>
                            <td>${DateHelper.toText(negociacao.data)}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                            <td>${negociacao.volume}
                        </tr>
                    `
                ).join('')}
            </tbody>
    
            <tfoot>
                    <td colspan='3'></td>
                    <td>${model.volumeTotal}</td>
            </tfoot>
        </table>
        `;
    }
}
