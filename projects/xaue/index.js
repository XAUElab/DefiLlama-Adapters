const ADDRESSES = require('../helper/coreAssets.json')
const XAUE_PROXY = "0xd5D6840ed95F58FAf537865DcA15D5f99195F87a";
const ORACLE_PROXY = "0x0618BD112C396060d2b37B537b3d92e757644169";

async function tvl(api) {
    const totalSupply = (await api.call({
        target: XAUE_PROXY,
        abi: "erc20:totalSupply",
    }));
    const oraclePrice = (await api.call({
        target: ORACLE_PROXY,
        abi: "uint256:getLatestPrice",
    }));
    let balance = totalSupply * oraclePrice / 1e36;
    api.add(ADDRESSES.null, balance);
}

module.exports = {
    methodology: 'Counts the number of tokens in XAUE times the chainlink USD price',
    ethereum: {
        tvl,
    },
};
