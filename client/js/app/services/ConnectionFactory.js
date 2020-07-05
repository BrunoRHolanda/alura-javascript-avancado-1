
var ConnectionFactory = (function() {
    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraFrame';

    var connection = null;
    var close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error('Classe não instanciavel!')
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {

                    if (connection === null) {
                        connection = e.target.result;

                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error('A conexão não pode ser fechada diretamente, utilize ConnectionFactory.close() após ter realizado todas as operações!');
                        }
                    }

                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);

                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(connection) {
            stores.forEach((store) => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }

                connection.createObjectStore(store, {autoIncrement: true});
            });
        }

        static closeConnection() {
            if (connection) {
                close();
                connection = null;
            }
        }
    }
})();
