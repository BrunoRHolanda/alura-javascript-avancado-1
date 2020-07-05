class NegociacaoService {

    constructor() {
        this.http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this.http.get('negociacoes/semana')
                .then((negociacoesJSON) => {
                    let negociacoes = negociacoesJSON
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

                    resolve(negociacoes);
            }).catch( erro => reject(erro));
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this.http.get('negociacoes/anterior')
                .then((negociacoesJSON) => {
                    let negociacoes = negociacoesJSON
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

                    resolve(negociacoes);
            }).catch( erro => reject(erro));
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this.http.get('negociacoes/retrasada')
                .then((negociacoesJSON) => {
                    let negociacoes = negociacoesJSON
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

                    resolve(negociacoes);
            }).catch( erro => reject(erro));
        });
    }

    obterNegociacoes() {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ]).then(periodos => {

                let negociacoes = periodos
                    .reduce((dados, periodo) => dados.concat(periodo), [])
                    .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

                resolve(negociacoes);

            }).catch(erro => reject(erro));
        });
    }    

    cadastrar() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.insert(negociacao))
            .then(() => 'Negociacao Adicionada com sucesso')
            .catch(() => {
                throw new Error('Não foi possível adicionar a negociação!')
            });
    }

    listar() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.listAll())
            .catch(erro => {
                throw new Error(erro)
            });
    }

    apagar() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.deleteAll())
            .then(() => 'Negociações Apagadas com sucesso!')
            .catch((error) => {
                throw new Error(error)
            })
    }
}
