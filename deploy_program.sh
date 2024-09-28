#!/bin/bash

# Generate a new keypair for the program ID
KEYPAIR_PATH="new_program_id.json"
TARGET_KEYPAIR_PATH="./target/deploy/token_2022_staking-keypair.json"
solana-keygen new --outfile $KEYPAIR_PATH --no-bip39-passphrase --force
solana-keygen new --outfile ./target/deploy/reward-mint-keypair.json --no-bip39-passphrase --force
solana-keygen new --outfile ./target/deploy/stake-mint-keypair.json --no-bip39-passphrase --force
solana-keygen new --outfile ./target/deploy/staker-mint-keypair.json --no-bip39-passphrase --force

cp $KEYPAIR_PATH $TARGET_KEYPAIR_PATH