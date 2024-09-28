import * as anchor from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "./target/idl/token_2022_staking.json"; // Adjust the path to your IDL file
import { TokenMetadata } from "@solana/spl-token-metadata";
import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

console.log("Interacting with the program");

process.env.ANCHOR_PROVIDER_URL = "https://api.devnet.solana.com";
process.env.ANCHOR_WALLET = "/home/ai/.config/solana/id.json";
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);



const programId = new PublicKey("7Fnpgk8zMDPBvGaRF1QsedeB8yYCjZudKqx4kXNQm1Nd"); // Replace with your program ID
const program = new anchor.Program(idl as anchor.Idl, provider);

const [config] = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from("config")],
  program.programId
);

  // create a new mint for reward token
  const rewardMintKeypair = anchor.web3.Keypair.generate();
  // create a new mint for stake token
  const stakeMintKeypair = anchor.web3.Keypair.generate();

  const metadata: TokenMetadata = {
    mint: stakeMintKeypair.publicKey,
    name: "STAKE TOKEN",
    symbol: "BCST",
    uri: "https://raw.githubusercontent.com/HongThaiPham/solana-bootcamp-autumn-2024/main/week-4/token-2022-staking/app/assets/token-info.json",
    additionalMetadata: [],
  };
  const staker = anchor.web3.Keypair.generate();
  console.log("Staker address: ", staker.publicKey.toBase58());
  const rewardPerSlot = new anchor.BN(1_000_000_000);
  const stakerTokenAccount = getAssociatedTokenAddressSync(
    stakeMintKeypair.publicKey,
    staker.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );
    // get pool address from stake token
    const [pool] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), stakeMintKeypair.publicKey.toBuffer()],
      program.programId
    );
  
    // get stake info address from pool and staker
    const [stakeInfo] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("stakeinfo"), pool.toBuffer(), staker.publicKey.toBuffer()],
      program.programId
    );
    const stakeInfoAta = getAssociatedTokenAddressSync(
      stakeMintKeypair.publicKey,
      stakeInfo,
      true,
      TOKEN_2022_PROGRAM_ID
    );
    const rewardAta = getAssociatedTokenAddressSync(
      rewardMintKeypair.publicKey,
      pool,
      true,
      TOKEN_2022_PROGRAM_ID
    );
  
    const stakeAmount = new anchor.BN(10 * anchor.web3.LAMPORTS_PER_SOL);
    const unstakeAmount = new anchor.BN(5 * anchor.web3.LAMPORTS_PER_SOL);
