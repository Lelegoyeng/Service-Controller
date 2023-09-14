const axios = require('axios');

const serverUrl = 'http://localhost:4000';

const loginData = {
    username: 'user',
    password: 'password',
};

axios.post(`${serverUrl}/login`, loginData)
    .then(response => {
        const { token } = response.data;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.get(`${serverUrl}/protected`, config)
            .then(protectedResponse => {
                console.log(protectedResponse.data);
            })
            .catch(error => {
                console.error(error.response.data);
            });
    })
    .catch(error => {
        console.error(error.response.data);
    });
