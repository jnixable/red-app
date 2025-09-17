# red-app

This is an example of how to use RedStone Oracle on Solana to fetch prices.
It's created for education purpose : to help people integrate RedStone in their programs/apps

It's just begining. Going to extend README and add comments to programs.
Also planing to create UI (ReactJS) to fetch prices and push them (in case of push model)

### Feed accounts

|                            | mainnet-beta                                 | testnet                                      | devnet                                       |
| -------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| ETH                        | HPmPoq3eUTPePsDB5U4G6msu5RpeZHhMemc5VnqxQ9Lx | BsFkAfSgub54ZMHxZpCXqB3zpWXF8NwAswbuNX1Jq55g | 6bgjyNJ18vWGjw2qjjseSBaDK4QbJF8sjsHAhwy8EuBW |
| BTC                        | 74o5fhuMC33HgfUqvv2TdpYiKvEWfcRTS1E8zxK6ESjN | FbTaAY9o6MU3xZKXT65xE3wATNrxU7nTnZZPmg4gS9Ad | AhQGbBqhbcqJhV7WJ5GktjtjM7dHBPYv2uFhL7Cy7gzQ |
| BUIDL_SOLANA_FUNDAMENTAL   | ESxdEASDcYRN4ybnYNCJJuPHcF2SGJN1MypQq1yfY9Kz | x                                            | x                                            |
| BUIDL_SOLANA_DAILY_ACCRUAL | CPKJ57Kvxf8Xrz1o3hqBK52SqqEUAPp1NVdCK94bDGSX | x                                            | x                                            |
| ACRED_SOLANA_FUNDAMENTAL   | 6sK8czVw8Xy6T8YbH6VC8p5ovNZD2mXf5vUTv8sgnUJf | x                                            | x                                            |
| sUSDS_FUNDAMENTAL          | x                                            | x                                            | BsakcTH9iP8vqvf9SvA6jQQfjn48qhCrUdP1EX4h1smY |
| VBILL_SOLANA_FUNDAMENTAL   | H9ckR9pZtPZCjRYz9RXBPhc2X6m4e3ndpxgVe7HgYVMd | x                                            | x                                            |
| LBTC_FUNDAMENTAL           | EjN4MxDvAbBEofxFwpvCsz2u8wZ96kHMsLmk2N5Bvomt | x                                            | x                                            |
| VBILL_SOLANA_DAILY_ACCRUAL | 8aMjLzsmjSEGmgybHWELTEinTw4kn3okfos5zHrt2TJG | x                                            | x                                            |

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (cargo and rustc)

## How to Run

1. **Build and run the project:**

```sh
cargo run
```

2. **Build the executable only:**

```sh
cargo build --release
```

The binary will be located in `target/release/red-app`.

3. **Run the built executable:**

```sh
target/release/red-app
```

## Additional Commands

- Run tests:
  ```sh
  cargo test
  ```
- Check code formatting:
  ```sh
  cargo fmt -- --check
  ```

## Troubleshooting

- If you encounter issues, ensure Rust is installed and up to date:
  ```sh
  rustup update
  ```

For more information, see the [Rust Book](https://doc.rust-lang.org/book/).
