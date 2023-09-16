const MetaApi = require('metaapi.cloud-sdk').default;
require('dotenv').config();

const token = process.env.TOKEN
const accountId = process.env.ACCOUNT_ID
const api = new MetaApi(token);

const Position = async () => {
    const account = await api.metatraderAccountApi.getAccount(accountId);
    const connection = account.getStreamingConnection();
    await connection.connect();
    const terminalState = connection.terminalState;
    await connection.waitSynchronized();
    const Position = terminalState.positions
    console.log(Position)
    return Position
}

module.exports = Position
