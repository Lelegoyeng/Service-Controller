const MetaApi = require('metaapi.cloud-sdk').default;
require('dotenv').config();

const token = process.env.TOKEN
const accountId = process.env.ACCOUNT_ID
const api = new MetaApi(token);

const History = async () => {
    const account = await api.metatraderAccountApi.getAccount(accountId);
    const connection = account.getStreamingConnection();
    await connection.connect();
    const terminalState = connection.terminalState;
    await connection.waitSynchronized();
    const historyStorage = connection.historyStorage.historyOrders;

    return historyStorage
}

module.exports = History
