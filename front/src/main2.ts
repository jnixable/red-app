/* import { Connection, PublicKey } from "@solana/web3.js";
import { RedstoneClient } from "@redstone-finance/solana-connector";

const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";
const ETH_FEED_ACCOUNT = new PublicKey("HPmPoq3eUTPePsDB5U4G6msu5RpeZHhMemc5VnqxQ9Lx");

async function fetchRedstonePrice() {
  const connection = new Connection(RPC_ENDPOINT, "confirmed");
  const client = new RedstoneClient(connection);

  try {
    const priceData = await client.getPrice("ETH");
    console.log("ETH Price:", priceData);
  } catch (error) {
    console.error("Error fetching price data:", error);
  }
}

fetchRedstonePrice();
 */