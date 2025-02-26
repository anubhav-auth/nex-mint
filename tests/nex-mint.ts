import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import { NexMint } from "../target/types/nex_mint";
import { 
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction 
} from "@solana/spl-token";

const { Keypair, SystemProgram } = web3;

describe("nex-mint", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const wallet = provider.wallet; // Define the wallet

  const program = anchor.workspace.NexMint as Program<NexMint>;

  // Generate a mint keypair and define mintPublicKey with correct type.
  const mintKeypair = Keypair.generate();
  const mintPublicKey: anchor.web3.PublicKey = mintKeypair.publicKey;

  // Define associated token account (ATA) with correct type.
  let destinationATA: anchor.web3.PublicKey;

  before(async () => {
    // Derive the associated token account for the wallet with the mint.
    destinationATA = await getAssociatedTokenAddress(
      mintPublicKey,
      wallet.publicKey
    );

    // Fetch rent exemption balance and create mint account.
    const lamports = await provider.connection.getMinimumBalanceForRentExemption(MINT_SIZE);
    const createMintIx = web3.SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: mintPublicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    });

    const initMintIx = createInitializeMintInstruction(
      mintPublicKey,
      0, // Decimals
      wallet.publicKey, // Mint authority
      wallet.publicKey  // Freeze authority (if needed)
    );

    const ataIx = createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      destinationATA,
      wallet.publicKey,
      mintPublicKey
    );

    // Create transaction and send it.
    const tx = new web3.Transaction().add(createMintIx, initMintIx, ataIx);
    await provider.sendAndConfirm(tx, [mintKeypair]);
  });

  it("mints tokens successfully", async () => {
    const tx = await program.methods.mintTokens(new anchor.BN(1000))
      .accounts({
        mint: mintPublicKey,
        destination: destinationATA,
        mintAuthority: wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
      
    console.log("Mint Transaction:", tx);
    // Here, you would fetch the token account and assert that the balance increased by 1000 tokens.
  });
});
