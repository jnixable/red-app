use anyhow::{ anyhow, Result };
use solana_client::rpc_client::RpcClient;
use solana_sdk::{ commitment_config::CommitmentConfig, pubkey::Pubkey };
use std::str::FromStr;

/// RedStone PriceAdapter program IDs
const REDSTONE_MAINNET: &str = "REDSTBDUecGjwXd6YGPzHSvEUBHQqVRfCcjUVgPiHsr";
const REDSTONE_TESTNET: &str = "rds8J7VKqLQgzDr7vS59dkQga3B1BotgFy8F7LSLC74";
const REDSTONE_DEVNET: &str = "REDuYsnEucMweattdv4xQCYdU1i8Q2W92kdayrpY9rA";

fn rpc_url(cluster: &str) -> &'static str {
    match cluster {
        "mainnet" => "https://api.mainnet-beta.solana.com",
        "testnet" => "https://api.testnet.solana.com",
        _ => "https://api.devnet.solana.com",
    }
}

fn redstone_program_id(cluster: &str) -> Pubkey {
    match cluster {
        "mainnet" => Pubkey::from_str(REDSTONE_MAINNET).unwrap(),
        "testnet" => Pubkey::from_str(REDSTONE_TESTNET).unwrap(),
        _ => Pubkey::from_str(REDSTONE_DEVNET).unwrap(),
    }
}

/// "price" right-padded with zeros to 32 bytes
fn make_price_seed() -> [u8; 32] {
    let mut s = [0u8; 32];
    s[..5].copy_from_slice(b"price");
    s
}

/// feed id padded to 32 bytes
fn feed_id_bytes(feed: &str) -> [u8; 32] {
    let mut b = [0u8; 32];
    let src = feed.as_bytes();
    let n = src.len().min(32);
    b[..n].copy_from_slice(&src[..n]);
    b
}

fn derive_price_feed_pda(adapter_program: &Pubkey, feed: &str) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[&make_price_seed(), &feed_id_bytes(feed)], adapter_program)
}

/// Parse RedStone account data into (price, decimals, timestamp)
fn parse_price_data(data: &[u8]) -> Result<(f64, u64, u8)> {
    if data.len() < 8 + 32 + 32 + 8 + 1 + 8 + 1 {
        return Err(anyhow!("account too small"));
    }
    let mut off = 8; // skip discriminator
    off += 32; // feed_id
    let value = &data[off..off + 32];
    off += 32;
    let timestamp = u64::from_le_bytes(data[off..off + 8].try_into().unwrap());
    off += 8;
    let _opt_tag = data[off];
    off += 1;
    let _opt_val = u64::from_le_bytes(data[off..off + 8].try_into().unwrap());
    off += 8;
    let _update_slot = u64::from_le_bytes(data[off..off + 8].try_into().unwrap());
    off += 8;
    let decimals = data[off]; // usually 8

    // Convert BE 32-byte value to u64
    if !value[..24].iter().all(|&b| b == 0) {
        return Err(anyhow!("value too large for u64"));
    }
    let price_u64 = u64::from_be_bytes(value[24..].try_into().unwrap());
    let price = (price_u64 as f64) / (10f64).powi(decimals as i32);
    Ok((price, timestamp, decimals))
}

fn main() -> Result<()> {
    let cluster = "mainnet";
    let feed = "ETH";

    let rpc = RpcClient::new_with_commitment(rpc_url(cluster), CommitmentConfig::confirmed());
    let adapter_id = redstone_program_id(cluster);
    let (pda, _bump) = derive_price_feed_pda(&adapter_id, feed);

    println!("Cluster: {}", cluster);
    println!("Adapter: {}", adapter_id);
    println!("Feed PDA: {}", pda);

    let acct = rpc.get_account(&pda)?;
    let (price, ts, dec) = parse_price_data(&acct.data)?;
    println!("{} price = {} (decimals {}) at timestamp {}", feed, price, dec, ts);

    Ok(())
}
