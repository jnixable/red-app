/* import { Connection, PublicKey } from "@solana/web3.js";
import { makeFeedIdBytes, makePriceSeed } from "./utils";
import { web3 } from "@coral-xyz/anchor";

const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";
const ETH_FEED_ACCOUNT = new PublicKey(
  "REDSTBDUecGjwXd6YGPzHSvEUBHQqVRfCcjUVgPiHsr"
);

interface RedStonePrice {
  price: number;
  decimals: number;
  lastUpdated: number;
}

function getPriceDataAccount(programId: PublicKey, feedId: string): PublicKey {
  return web3.PublicKey.findProgramAddressSync(
    [makePriceSeed(), makeFeedIdBytes(feedId)],
    programId
  )[0];
}

async function fetchRedstonePrice(
  feedAccount: PublicKey
): Promise<RedStonePrice | null> {
  const connection = new Connection(RPC_ENDPOINT, "confirmed");

  const accountInfo = await connection.getAccountInfo(feedAccount);
  if (!accountInfo) {
    console.error("Feed account not found");
    return null;
  }

  const data = accountInfo.data;

  const parsed = parsePriceAccount(data);

  console.log('parsed', parsed)

  return {
    price: parsed.price,
    decimals: -parsed.expo,
    lastUpdated: -1,
  };
}

async function main() {
  const account = getPriceDataAccount(ETH_FEED_ACCOUNT, "ETH");
  console.log('account', account)
  const res = await fetchRedstonePrice(account);
  if (res) {
    console.log(`ETH price: $${res.price} (decimals: ${res.decimals}, lastUpdated: ${res.lastUpdated})`);
  } else {
    console.log("Failed to fetch price data.");
  }
}


function parsePriceAccount(data: Buffer) {
  const price = data.readBigUInt64LE(0);
  const expo = data.readInt32LE(8);
  const timestamp = data.readBigUInt64LE(12);

  return {
    price: Number(price) * Math.pow(10, expo),
    expo,
    lastUpdated: new Date(Number(timestamp) * 1000).toISOString(),
  };
}

main().catch(console.error);
 */