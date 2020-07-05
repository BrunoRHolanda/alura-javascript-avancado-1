class HttpService {

    _handleError(response) {
        if (response.ok === false) {
            throw new Error(response.statusText);
        }

        return response;
    }

    get(url) {
        return fetch(url)
            .then(response => this._handleError(response))
            .then(response => response.json())
    }

    post(url, data) {

        return fetch(url, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: 'post',
            body: JSON.stringify(data)
        })
    }
}
