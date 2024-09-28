#!/bin/bash

# Generate a new keypair for the program ID
KEYPAIR_PATH="new_program_id.json"
solana-keygen new --outfile $KEYPAIR_PATH --no-bip39-passphrase --force

cp $KEYPAIR_PATH $TARGET_KEYPAIR_PATH