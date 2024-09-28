import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";
import { Cluster, PublicKey } from "@solana/web3.js";

export const TODO_PROGRAM_ID = new PublicKey(
  "7Fnpgk8zMDPBvGaRF1QsedeB8yYCjZudKqx4kXNQm1Nd"
);
export function getProvider(cluster: Cluster): AnchorProvider {
  const network = cluster === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com";
  const connection = new Connection(network, "processed");
  const wallet = window.solana; // Assuming the wallet is injected by a browser extension like Phantom
  return new AnchorProvider(connection, wallet, { preflightCommitment: "processed" });
}

export function getProgramId(cluster: Cluster) {
  switch (cluster) {
    case "devnet":
    case "testnet":
    case "mainnet-beta":
    default:
      return TODO_PROGRAM_ID;
  }
}
