#[starknet::contract]
mod CodeStackRewards {
    use starknet::{ContractAddress, get_caller_address, get_contract_address};
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};

    #[storage]
    struct Storage {
        strk_token: ContractAddress,
        usdt_token: ContractAddress,
        owner: ContractAddress,
        user_balances: LegacyMap<ContractAddress, u256>,
        total_rewards_distributed: u256,
        conversion_rate: u256, // STRK to USDT rate (scaled by 1e18)
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        RewardMinted: RewardMinted,
        TokensConverted: TokensConverted,
        RateUpdated: RateUpdated,
    }

    #[derive(Drop, starknet::Event)]
    struct RewardMinted {
        user: ContractAddress,
        amount: u256,
        reason: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct TokensConverted {
        user: ContractAddress,
        strk_amount: u256,
        usdt_amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct RateUpdated {
        old_rate: u256,
        new_rate: u256,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        strk_token: ContractAddress,
        usdt_token: ContractAddress,
        initial_rate: u256
    ) {
        self.strk_token.write(strk_token);
        self.usdt_token.write(usdt_token);
        self.owner.write(get_caller_address());
        self.conversion_rate.write(initial_rate);
    }

    #[external(v0)]
    impl CodeStackRewardsImpl of super::ICodeStackRewards<ContractState> {
        fn mint_reward(ref self: ContractState, user: ContractAddress, amount: u256, reason: felt252) {
            // Only owner can mint rewards (backend service)
            assert(get_caller_address() == self.owner.read(), 'Only owner can mint');
            
            let strk_token = IERC20Dispatcher { contract_address: self.strk_token.read() };
            
            // Mint STRK tokens to user
            strk_token.transfer(user, amount);
            
            // Update user balance
            let current_balance = self.user_balances.read(user);
            self.user_balances.write(user, current_balance + amount);
            
            // Update total rewards
            let total = self.total_rewards_distributed.read();
            self.total_rewards_distributed.write(total + amount);
            
            self.emit(RewardMinted { user, amount, reason });
        }

        fn convert_strk_to_usdt(ref self: ContractState, strk_amount: u256) {
            let caller = get_caller_address();
            let user_balance = self.user_balances.read(caller);
            
            assert(user_balance >= strk_amount, 'Insufficient STRK balance');
            
            let rate = self.conversion_rate.read();
            let usdt_amount = (strk_amount * rate) / 1000000000000000000; // Divide by 1e18
            
            let strk_token = IERC20Dispatcher { contract_address: self.strk_token.read() };
            let usdt_token = IERC20Dispatcher { contract_address: self.usdt_token.read() };
            
            // Burn STRK tokens from user
            strk_token.transfer_from(caller, get_contract_address(), strk_amount);
            
            // Transfer USDT to user
            usdt_token.transfer(caller, usdt_amount);
            
            // Update user balance
            self.user_balances.write(caller, user_balance - strk_amount);
            
            self.emit(TokensConverted { user: caller, strk_amount, usdt_amount });
        }

        fn get_user_balance(self: @ContractState, user: ContractAddress) -> u256 {
            self.user_balances.read(user)
        }

        fn get_conversion_rate(self: @ContractState) -> u256 {
            self.conversion_rate.read()
        }

        fn update_conversion_rate(ref self: ContractState, new_rate: u256) {
            assert(get_caller_address() == self.owner.read(), 'Only owner can update rate');
            
            let old_rate = self.conversion_rate.read();
            self.conversion_rate.write(new_rate);
            
            self.emit(RateUpdated { old_rate, new_rate });
        }

        fn get_total_rewards_distributed(self: @ContractState) -> u256 {
            self.total_rewards_distributed.read()
        }
    }
}

#[starknet::interface]
trait ICodeStackRewards<TContractState> {
    fn mint_reward(ref self: TContractState, user: ContractAddress, amount: u256, reason: felt252);
    fn convert_strk_to_usdt(ref self: TContractState, strk_amount: u256);
    fn get_user_balance(self: @TContractState, user: ContractAddress) -> u256;
    fn get_conversion_rate(self: @TContractState) -> u256;
    fn update_conversion_rate(ref self: TContractState, new_rate: u256);
    fn get_total_rewards_distributed(self: @TContractState) -> u256;
}
