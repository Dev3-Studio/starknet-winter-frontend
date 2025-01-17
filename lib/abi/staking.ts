export default [
    {
        'type': 'impl',
        'name': '_Identity',
        'interface_name': 'contracts_commons::interfaces::identity::Identity',
    },
    {
        'type': 'interface',
        'name': 'contracts_commons::interfaces::identity::Identity',
        'items': [
            {
                'type': 'function',
                'name': 'identify',
                'inputs': [],
                'outputs': [
                    {
                        'type': 'core::felt252',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'version',
                'inputs': [],
                'outputs': [
                    {
                        'type': 'core::felt252',
                    },
                ],
                'state_mutability': 'view',
            },
        ],
    },
    {
        'type': 'impl',
        'name': 'PoolImpl',
        'interface_name': 'contracts::pool::interface::IPool',
    },
    {
        'type': 'struct',
        'name': 'core::array::Span::<core::felt252>',
        'members': [
            {
                'name': 'snapshot',
                'type': '@core::array::Array::<core::felt252>',
            },
        ],
    },
    {
        'type': 'struct',
        'name': 'contracts_commons::types::time::TimeStamp',
        'members': [
            {
                'name': 'seconds',
                'type': 'core::integer::u64',
            },
        ],
    },
    {
        'type': 'enum',
        'name': 'core::option::Option::<contracts_commons::types::time::TimeStamp>',
        'variants': [
            {
                'name': 'Some',
                'type': 'contracts_commons::types::time::TimeStamp',
            },
            {
                'name': 'None',
                'type': '()',
            },
        ],
    },
    {
        'type': 'struct',
        'name': 'contracts::pool::interface::PoolMemberInfo',
        'members': [
            {
                'name': 'reward_address',
                'type': 'core::starknet::contract_address::ContractAddress',
            },
            {
                'name': 'amount',
                'type': 'core::integer::u128',
            },
            {
                'name': 'index',
                'type': 'core::integer::u128',
            },
            {
                'name': 'unclaimed_rewards',
                'type': 'core::integer::u128',
            },
            {
                'name': 'commission',
                'type': 'core::integer::u16',
            },
            {
                'name': 'unpool_amount',
                'type': 'core::integer::u128',
            },
            {
                'name': 'unpool_time',
                'type': 'core::option::Option::<contracts_commons::types::time::TimeStamp>',
            },
        ],
    },
    {
        'type': 'enum',
        'name': 'core::option::Option::<contracts::pool::interface::PoolMemberInfo>',
        'variants': [
            {
                'name': 'Some',
                'type': 'contracts::pool::interface::PoolMemberInfo',
            },
            {
                'name': 'None',
                'type': '()',
            },
        ],
    },
    {
        'type': 'enum',
        'name': 'core::option::Option::<core::integer::u128>',
        'variants': [
            {
                'name': 'Some',
                'type': 'core::integer::u128',
            },
            {
                'name': 'None',
                'type': '()',
            },
        ],
    },
    {
        'type': 'struct',
        'name': 'contracts::pool::interface::PoolContractInfo',
        'members': [
            {
                'name': 'staker_address',
                'type': 'core::starknet::contract_address::ContractAddress',
            },
            {
                'name': 'final_staker_index',
                'type': 'core::option::Option::<core::integer::u128>',
            },
            {
                'name': 'staking_contract',
                'type': 'core::starknet::contract_address::ContractAddress',
            },
            {
                'name': 'token_address',
                'type': 'core::starknet::contract_address::ContractAddress',
            },
            {
                'name': 'commission',
                'type': 'core::integer::u16',
            },
        ],
    },
    {
        'type': 'interface',
        'name': 'contracts::pool::interface::IPool',
        'items': [
            {
                'type': 'function',
                'name': 'enter_delegation_pool',
                'inputs': [
                    {
                        'name': 'reward_address',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        'name': 'amount',
                        'type': 'core::integer::u128',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'add_to_delegation_pool',
                'inputs': [
                    {
                        'name': 'pool_member',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        'name': 'amount',
                        'type': 'core::integer::u128',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::integer::u128',
                    },
                ],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'exit_delegation_pool_intent',
                'inputs': [
                    {
                        'name': 'amount',
                        'type': 'core::integer::u128',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'exit_delegation_pool_action',
                'inputs': [
                    {
                        'name': 'pool_member',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::integer::u128',
                    },
                ],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'claim_rewards',
                'inputs': [
                    {
                        'name': 'pool_member',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::integer::u128',
                    },
                ],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'switch_delegation_pool',
                'inputs': [
                    {
                        'name': 'to_staker',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        'name': 'to_pool',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                    {
                        'name': 'amount',
                        'type': 'core::integer::u128',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::integer::u128',
                    },
                ],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'enter_delegation_pool_from_staking_contract',
                'inputs': [
                    {
                        'name': 'amount',
                        'type': 'core::integer::u128',
                    },
                    {
                        'name': 'index',
                        'type': 'core::integer::u128',
                    },
                    {
                        'name': 'data',
                        'type': 'core::array::Span::<core::felt252>',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'set_final_staker_index',
                'inputs': [
                    {
                        'name': 'final_staker_index',
                        'type': 'core::integer::u128',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'change_reward_address',
                'inputs': [
                    {
                        'name': 'reward_address',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'pool_member_info',
                'inputs': [
                    {
                        'name': 'pool_member',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'contracts::pool::interface::PoolMemberInfo',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'get_pool_member_info',
                'inputs': [
                    {
                        'name': 'pool_member',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::option::Option::<contracts::pool::interface::PoolMemberInfo>',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'contract_parameters',
                'inputs': [],
                'outputs': [
                    {
                        'type': 'contracts::pool::interface::PoolContractInfo',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'update_commission_from_staking_contract',
                'inputs': [
                    {
                        'name': 'commission',
                        'type': 'core::integer::u16',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
        ],
    },
    {
        'type': 'impl',
        'name': 'ReplaceabilityImpl',
        'interface_name': 'contracts_commons::components::replaceability::interface::IReplaceable',
    },
    {
        'type': 'struct',
        'name': 'contracts_commons::components::replaceability::interface::EICData',
        'members': [
            {
                'name': 'eic_hash',
                'type': 'core::starknet::class_hash::ClassHash',
            },
            {
                'name': 'eic_init_data',
                'type': 'core::array::Span::<core::felt252>',
            },
        ],
    },
    {
        'type': 'enum',
        'name': 'core::option::Option::<contracts_commons::components::replaceability::interface::EICData>',
        'variants': [
            {
                'name': 'Some',
                'type': 'contracts_commons::components::replaceability::interface::EICData',
            },
            {
                'name': 'None',
                'type': '()',
            },
        ],
    },
    {
        'type': 'enum',
        'name': 'core::bool',
        'variants': [
            {
                'name': 'False',
                'type': '()',
            },
            {
                'name': 'True',
                'type': '()',
            },
        ],
    },
    {
        'type': 'struct',
        'name': 'contracts_commons::components::replaceability::interface::ImplementationData',
        'members': [
            {
                'name': 'impl_hash',
                'type': 'core::starknet::class_hash::ClassHash',
            },
            {
                'name': 'eic_data',
                'type': 'core::option::Option::<contracts_commons::components::replaceability::interface::EICData>',
            },
            {
                'name': 'final',
                'type': 'core::bool',
            },
        ],
    },
    {
        'type': 'interface',
        'name': 'contracts_commons::components::replaceability::interface::IReplaceable',
        'items': [
            {
                'type': 'function',
                'name': 'get_upgrade_delay',
                'inputs': [],
                'outputs': [
                    {
                        'type': 'core::integer::u64',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'get_impl_activation_time',
                'inputs': [
                    {
                        'name': 'implementation_data',
                        'type': 'contracts_commons::components::replaceability::interface::ImplementationData',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::integer::u64',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'add_new_implementation',
                'inputs': [
                    {
                        'name': 'implementation_data',
                        'type': 'contracts_commons::components::replaceability::interface::ImplementationData',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'remove_implementation',
                'inputs': [
                    {
                        'name': 'implementation_data',
                        'type': 'contracts_commons::components::replaceability::interface::ImplementationData',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'replace_to',
                'inputs': [
                    {
                        'name': 'implementation_data',
                        'type': 'contracts_commons::components::replaceability::interface::ImplementationData',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
        ],
    },
    {
        'type': 'impl',
        'name': 'RolesImpl',
        'interface_name': 'contracts_commons::components::roles::interface::IRoles',
    },
    {
        'type': 'interface',
        'name': 'contracts_commons::components::roles::interface::IRoles',
        'items': [
            {
                'type': 'function',
                'name': 'is_app_governor',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::bool',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'is_app_role_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::bool',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'is_governance_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::bool',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'is_operator',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::bool',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'is_token_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::bool',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'is_upgrade_governor',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::bool',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'is_security_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::bool',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'is_security_agent',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [
                    {
                        'type': 'core::bool',
                    },
                ],
                'state_mutability': 'view',
            },
            {
                'type': 'function',
                'name': 'register_app_governor',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'remove_app_governor',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'register_app_role_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'remove_app_role_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'register_governance_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'remove_governance_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'register_operator',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'remove_operator',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'register_token_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'remove_token_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'register_upgrade_governor',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'remove_upgrade_governor',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'renounce',
                'inputs': [
                    {
                        'name': 'role',
                        'type': 'core::felt252',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'register_security_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'remove_security_admin',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'register_security_agent',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
            {
                'type': 'function',
                'name': 'remove_security_agent',
                'inputs': [
                    {
                        'name': 'account',
                        'type': 'core::starknet::contract_address::ContractAddress',
                    },
                ],
                'outputs': [],
                'state_mutability': 'external',
            },
        ],
    },
    {
        'type': 'constructor',
        'name': 'constructor',
        'inputs': [
            {
                'name': 'staker_address',
                'type': 'core::starknet::contract_address::ContractAddress',
            },
            {
                'name': 'staking_contract',
                'type': 'core::starknet::contract_address::ContractAddress',
            },
            {
                'name': 'token_address',
                'type': 'core::starknet::contract_address::ContractAddress',
            },
            {
                'name': 'commission',
                'type': 'core::integer::u16',
            },
            {
                'name': 'governance_admin',
                'type': 'core::starknet::contract_address::ContractAddress',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::replaceability::interface::ImplementationAdded',
        'kind': 'struct',
        'members': [
            {
                'name': 'implementation_data',
                'type': 'contracts_commons::components::replaceability::interface::ImplementationData',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::replaceability::interface::ImplementationRemoved',
        'kind': 'struct',
        'members': [
            {
                'name': 'implementation_data',
                'type': 'contracts_commons::components::replaceability::interface::ImplementationData',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::replaceability::interface::ImplementationReplaced',
        'kind': 'struct',
        'members': [
            {
                'name': 'implementation_data',
                'type': 'contracts_commons::components::replaceability::interface::ImplementationData',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::replaceability::interface::ImplementationFinalized',
        'kind': 'struct',
        'members': [
            {
                'name': 'impl_hash',
                'type': 'core::starknet::class_hash::ClassHash',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::replaceability::replaceability::ReplaceabilityComponent::Event',
        'kind': 'enum',
        'variants': [
            {
                'name': 'ImplementationAdded',
                'type': 'contracts_commons::components::replaceability::interface::ImplementationAdded',
                'kind': 'nested',
            },
            {
                'name': 'ImplementationRemoved',
                'type': 'contracts_commons::components::replaceability::interface::ImplementationRemoved',
                'kind': 'nested',
            },
            {
                'name': 'ImplementationReplaced',
                'type': 'contracts_commons::components::replaceability::interface::ImplementationReplaced',
                'kind': 'nested',
            },
            {
                'name': 'ImplementationFinalized',
                'type': 'contracts_commons::components::replaceability::interface::ImplementationFinalized',
                'kind': 'nested',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted',
        'kind': 'struct',
        'members': [
            {
                'name': 'role',
                'type': 'core::felt252',
                'kind': 'data',
            },
            {
                'name': 'account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'sender',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked',
        'kind': 'struct',
        'members': [
            {
                'name': 'role',
                'type': 'core::felt252',
                'kind': 'data',
            },
            {
                'name': 'account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'sender',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged',
        'kind': 'struct',
        'members': [
            {
                'name': 'role',
                'type': 'core::felt252',
                'kind': 'data',
            },
            {
                'name': 'previous_admin_role',
                'type': 'core::felt252',
                'kind': 'data',
            },
            {
                'name': 'new_admin_role',
                'type': 'core::felt252',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::Event',
        'kind': 'enum',
        'variants': [
            {
                'name': 'RoleGranted',
                'type': 'openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted',
                'kind': 'nested',
            },
            {
                'name': 'RoleRevoked',
                'type': 'openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked',
                'kind': 'nested',
            },
            {
                'name': 'RoleAdminChanged',
                'type': 'openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged',
                'kind': 'nested',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'openzeppelin_introspection::src5::SRC5Component::Event',
        'kind': 'enum',
        'variants': [],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::AppGovernorAdded',
        'kind': 'struct',
        'members': [
            {
                'name': 'added_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'added_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::AppGovernorRemoved',
        'kind': 'struct',
        'members': [
            {
                'name': 'removed_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'removed_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::AppRoleAdminAdded',
        'kind': 'struct',
        'members': [
            {
                'name': 'added_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'added_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::AppRoleAdminRemoved',
        'kind': 'struct',
        'members': [
            {
                'name': 'removed_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'removed_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::GovernanceAdminAdded',
        'kind': 'struct',
        'members': [
            {
                'name': 'added_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'added_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::GovernanceAdminRemoved',
        'kind': 'struct',
        'members': [
            {
                'name': 'removed_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'removed_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::OperatorAdded',
        'kind': 'struct',
        'members': [
            {
                'name': 'added_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'added_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::OperatorRemoved',
        'kind': 'struct',
        'members': [
            {
                'name': 'removed_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'removed_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::SecurityAdminAdded',
        'kind': 'struct',
        'members': [
            {
                'name': 'added_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'added_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::SecurityAdminRemoved',
        'kind': 'struct',
        'members': [
            {
                'name': 'removed_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'removed_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::SecurityAgentAdded',
        'kind': 'struct',
        'members': [
            {
                'name': 'added_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'added_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::SecurityAgentRemoved',
        'kind': 'struct',
        'members': [
            {
                'name': 'removed_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'removed_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::TokenAdminAdded',
        'kind': 'struct',
        'members': [
            {
                'name': 'added_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'added_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::TokenAdminRemoved',
        'kind': 'struct',
        'members': [
            {
                'name': 'removed_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'removed_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::UpgradeGovernorAdded',
        'kind': 'struct',
        'members': [
            {
                'name': 'added_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'added_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::interface::UpgradeGovernorRemoved',
        'kind': 'struct',
        'members': [
            {
                'name': 'removed_account',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'removed_by',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts_commons::components::roles::roles::RolesComponent::Event',
        'kind': 'enum',
        'variants': [
            {
                'name': 'AppGovernorAdded',
                'type': 'contracts_commons::components::roles::interface::AppGovernorAdded',
                'kind': 'nested',
            },
            {
                'name': 'AppGovernorRemoved',
                'type': 'contracts_commons::components::roles::interface::AppGovernorRemoved',
                'kind': 'nested',
            },
            {
                'name': 'AppRoleAdminAdded',
                'type': 'contracts_commons::components::roles::interface::AppRoleAdminAdded',
                'kind': 'nested',
            },
            {
                'name': 'AppRoleAdminRemoved',
                'type': 'contracts_commons::components::roles::interface::AppRoleAdminRemoved',
                'kind': 'nested',
            },
            {
                'name': 'GovernanceAdminAdded',
                'type': 'contracts_commons::components::roles::interface::GovernanceAdminAdded',
                'kind': 'nested',
            },
            {
                'name': 'GovernanceAdminRemoved',
                'type': 'contracts_commons::components::roles::interface::GovernanceAdminRemoved',
                'kind': 'nested',
            },
            {
                'name': 'OperatorAdded',
                'type': 'contracts_commons::components::roles::interface::OperatorAdded',
                'kind': 'nested',
            },
            {
                'name': 'OperatorRemoved',
                'type': 'contracts_commons::components::roles::interface::OperatorRemoved',
                'kind': 'nested',
            },
            {
                'name': 'SecurityAdminAdded',
                'type': 'contracts_commons::components::roles::interface::SecurityAdminAdded',
                'kind': 'nested',
            },
            {
                'name': 'SecurityAdminRemoved',
                'type': 'contracts_commons::components::roles::interface::SecurityAdminRemoved',
                'kind': 'nested',
            },
            {
                'name': 'SecurityAgentAdded',
                'type': 'contracts_commons::components::roles::interface::SecurityAgentAdded',
                'kind': 'nested',
            },
            {
                'name': 'SecurityAgentRemoved',
                'type': 'contracts_commons::components::roles::interface::SecurityAgentRemoved',
                'kind': 'nested',
            },
            {
                'name': 'TokenAdminAdded',
                'type': 'contracts_commons::components::roles::interface::TokenAdminAdded',
                'kind': 'nested',
            },
            {
                'name': 'TokenAdminRemoved',
                'type': 'contracts_commons::components::roles::interface::TokenAdminRemoved',
                'kind': 'nested',
            },
            {
                'name': 'UpgradeGovernorAdded',
                'type': 'contracts_commons::components::roles::interface::UpgradeGovernorAdded',
                'kind': 'nested',
            },
            {
                'name': 'UpgradeGovernorRemoved',
                'type': 'contracts_commons::components::roles::interface::UpgradeGovernorRemoved',
                'kind': 'nested',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::interface::Events::PoolMemberExitIntent',
        'kind': 'struct',
        'members': [
            {
                'name': 'pool_member',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'exit_timestamp',
                'type': 'contracts_commons::types::time::TimeStamp',
                'kind': 'data',
            },
            {
                'name': 'amount',
                'type': 'core::integer::u128',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::interface::Events::PoolMemberBalanceChanged',
        'kind': 'struct',
        'members': [
            {
                'name': 'pool_member',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'old_delegated_stake',
                'type': 'core::integer::u128',
                'kind': 'data',
            },
            {
                'name': 'new_delegated_stake',
                'type': 'core::integer::u128',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::interface::Events::PoolMemberRewardAddressChanged',
        'kind': 'struct',
        'members': [
            {
                'name': 'pool_member',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'new_address',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'old_address',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::interface::Events::FinalIndexSet',
        'kind': 'struct',
        'members': [
            {
                'name': 'staker_address',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'final_staker_index',
                'type': 'core::integer::u128',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::interface::Events::PoolMemberRewardClaimed',
        'kind': 'struct',
        'members': [
            {
                'name': 'pool_member',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'reward_address',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'amount',
                'type': 'core::integer::u128',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::interface::Events::DeletePoolMember',
        'kind': 'struct',
        'members': [
            {
                'name': 'pool_member',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'reward_address',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::interface::Events::NewPoolMember',
        'kind': 'struct',
        'members': [
            {
                'name': 'pool_member',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'staker_address',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'reward_address',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'data',
            },
            {
                'name': 'amount',
                'type': 'core::integer::u128',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::interface::Events::SwitchDelegationPool',
        'kind': 'struct',
        'members': [
            {
                'name': 'pool_member',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'new_delegation_pool',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'amount',
                'type': 'core::integer::u128',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::interface::Events::PoolMemberExitAction',
        'kind': 'struct',
        'members': [
            {
                'name': 'pool_member',
                'type': 'core::starknet::contract_address::ContractAddress',
                'kind': 'key',
            },
            {
                'name': 'unpool_amount',
                'type': 'core::integer::u128',
                'kind': 'data',
            },
        ],
    },
    {
        'type': 'event',
        'name': 'contracts::pool::pool::Pool::Event',
        'kind': 'enum',
        'variants': [
            {
                'name': 'ReplaceabilityEvent',
                'type': 'contracts_commons::components::replaceability::replaceability::ReplaceabilityComponent::Event',
                'kind': 'flat',
            },
            {
                'name': 'AccessControlEvent',
                'type': 'openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::Event',
                'kind': 'flat',
            },
            {
                'name': 'SRC5Event',
                'type': 'openzeppelin_introspection::src5::SRC5Component::Event',
                'kind': 'flat',
            },
            {
                'name': 'RolesEvent',
                'type': 'contracts_commons::components::roles::roles::RolesComponent::Event',
                'kind': 'flat',
            },
            {
                'name': 'PoolMemberExitIntent',
                'type': 'contracts::pool::interface::Events::PoolMemberExitIntent',
                'kind': 'nested',
            },
            {
                'name': 'PoolMemberBalanceChanged',
                'type': 'contracts::pool::interface::Events::PoolMemberBalanceChanged',
                'kind': 'nested',
            },
            {
                'name': 'PoolMemberRewardAddressChanged',
                'type': 'contracts::pool::interface::Events::PoolMemberRewardAddressChanged',
                'kind': 'nested',
            },
            {
                'name': 'FinalIndexSet',
                'type': 'contracts::pool::interface::Events::FinalIndexSet',
                'kind': 'nested',
            },
            {
                'name': 'PoolMemberRewardClaimed',
                'type': 'contracts::pool::interface::Events::PoolMemberRewardClaimed',
                'kind': 'nested',
            },
            {
                'name': 'DeletePoolMember',
                'type': 'contracts::pool::interface::Events::DeletePoolMember',
                'kind': 'nested',
            },
            {
                'name': 'NewPoolMember',
                'type': 'contracts::pool::interface::Events::NewPoolMember',
                'kind': 'nested',
            },
            {
                'name': 'SwitchDelegationPool',
                'type': 'contracts::pool::interface::Events::SwitchDelegationPool',
                'kind': 'nested',
            },
            {
                'name': 'PoolMemberExitAction',
                'type': 'contracts::pool::interface::Events::PoolMemberExitAction',
                'kind': 'nested',
            },
        ],
    },
] as const;