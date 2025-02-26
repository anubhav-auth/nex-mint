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
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const wallet = provider.wallet; 

  const program = anchor.workspace.NexMint as Program<NexMint>;

  const mintKeypair = Keypair.generate();
  const mintPublicKey: anchor.web3.PublicKey = mintKeypair.publicKey;

  let destinationATA: anchor.web3.PublicKey;

  before(async () => {
    destinationATA = await getAssociatedTokenAddress(
      mintPublicKey,
      wallet.publicKey
    );

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
      0,
      wallet.publicKey,
      wallet.publicKey
    );

    const ataIx = createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      destinationATA,
      wallet.publicKey,
      mintPublicKey
    );

    const tx = new web3.Transaction().add(createMintIx, initMintIx, ataIx);
    await provider.sendAndConfirm(tx, [mintKeypair]);
  });

  it("mints tokens successfully", async () => {
    const tx = await program.methods.mintTokens(new anchor.BN(1000))
      .accounts({
        mint: mintPublicKey,
        destination: destinationATA,
        mintAuthority: wallet.publicKey
      })
      .rpc();
      
    console.log("Mint Transaction:", tx);
  });
});
