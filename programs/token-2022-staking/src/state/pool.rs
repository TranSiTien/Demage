use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Pool {
    pub authority: Pubkey,
    pub stake_mint: Pubkey,
    pub reward_mint: Pubkey,
    pub reward_ata: Pubkey,
    pub allocation: u64,
    pub reward_per_slot: u64,
}

impl Pool {
    pub fn calculate_reward_based_on_slots(&self, from_slot: u64, to_slot: u64) -> u64 {
        let elapsed = to_slot - from_slot;
        elapsed * self.reward_per_slot
    }

    pub fn calculate_reward_base_on_blocks(
        &self,
        last_deposit_slot: u64,
        current_slot: u64,
        staked_amount: u64
    ) -> u64 {
        let blocks = current_slot.checked_sub(last_deposit_slot).unwrap_or(0);
        let reward_rate = 0.01; // 1% per block
        let reward = ((staked_amount as f64) * reward_rate * (blocks as f64)).round() as u64;
        reward
    }
}
