#![allow(unexpected_cfgs)]


use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, MintTo, Transfer, Burn};

declare_id!("7RbBhS3jiAeTBmWNwnXfVM2336k2hjxW2A7waT2Mw3Ph");

#[program]
pub mod nex_mint {
    use super::*;

    // Mint new tokens to the destination account.
    pub fn mint_tokens(ctx: Context<MintTokens>, amount: u64) -> Result<()> {
        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.destination.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        };
        token::mint_to(CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts), amount)?;
        Ok(())
    }

    // Transfer tokens from one account to another.
    pub fn transfer_tokens(ctx: Context<TransferTokens>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.source.to_account_info(),
            to: ctx.accounts.destination.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        token::transfer(CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts), amount)?;
        Ok(())
    }

    // Burn tokens from an account.
    pub fn burn_tokens(ctx: Context<BurnTokens>, amount: u64) -> Result<()> {
        let cpi_accounts = Burn {
            mint: ctx.accounts.mint.to_account_info(),
            from: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        token::burn(CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts), amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintTokens<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub destination: Account<'info, TokenAccount>,

    #[account(signer)]
    /// CHECK: The mint_authority is trusted to sign for minting tokens.
    pub mint_authority: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct TransferTokens<'info> {
    #[account(mut)]
    pub source: Account<'info, TokenAccount>,

    #[account(mut)]
    pub destination: Account<'info, TokenAccount>,

    #[account(signer)]
    /// CHECK: The authority is assumed to be valid since it must sign the transaction.
    pub authority: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct BurnTokens<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,

    #[account(signer)]
    /// CHECK: This authority is trusted to have the right to burn tokens.
    pub authority: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
}
