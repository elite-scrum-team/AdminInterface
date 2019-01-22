const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
    fetch: {
        async post(serviceBase, path, query, body, userId = undefined) {
            if (userId) query['internalUserId'] = userId;
            let url = `http://${serviceBase}/api/v1/${path}`;
            const qs = querystring.stringify(query);
            if (qs) url += `?${qs}`;
            return await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        },

        async put(serviceBase, path, query, body, userId = undefined) {
            if (userId) query['internalUserId'] = userId;
            let url = `http://${serviceBase}/api/v1/${path}`;
            const qs = querystring.stringify(query);
            if (qs) url += `?${qs}`;
            return await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        },

        async delete(serviceBase, path, query, userId = undefined) {
            if (userId) query['internalUserId'] = userId;
            let url = `http://${serviceBase}/api/v1/${path}`;
            const qs = querystring.stringify(query);
            if (qs) url += `?${qs}`;
            return await fetch(url, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        },

        async get(serviceBase, path, query, userId = undefined) {
            if (userId) query['internalUserId'] = userId;
            let url = `http://${serviceBase}/api/v1/${path}`;
            const qs = querystring.stringify(query);
            if (qs) url += `?${qs}`;
            return await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        },
    },
};
