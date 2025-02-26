import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { NexMint } from "../target/types/nex_mint";

describe("nex-mint", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.NexMint as Program<NexMint>;

  it("mints tokens successfully", async () => {
    // Generate keypairs and prepare accounts...
    const tx = await program.methods.mintTokens(new anchor.BN(1000))
      .accounts({
        mint: mintPublicKey,
        destination: destinationATA,
        mintAuthority: wallet.publicKey,
        tokenProgram: anchor.web3.Token.TOKEN_PROGRAM_ID,
      })
      .rpc();
    console.log("Mint Transaction:", tx);
    // Assert token balance changes, etc.
  });  
});
