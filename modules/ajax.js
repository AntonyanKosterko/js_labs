class Ajax {
    get(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(xhr.response);
                this._handleResponse(xhr, callback);
            }
        };
    }

    getByIndex(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(xhr.response);
                this._handleResponse(xhr, callback);
            }
        };
    }

    post(url, newItem, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(newItem));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(xhr.response);
                this._handleResponse(xhr, callback);
            }
        };
    }

    delete(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(xhr.response);
                this._handleResponse(xhr, callback);
            }
        };
    }

    patch(url, updatedData, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(updatedData));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(xhr.response);
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {XMLHttpRequest} xhr - Объект запроса
     * @param {function} callback - Функция обратного вызова
     */
    _handleResponse(xhr, callback) {
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax();
