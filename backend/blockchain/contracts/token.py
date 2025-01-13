'''
Copyright (c) 2025 Christian Bannard
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-------------------------------------------------------------------------
File: c:\localdev\crypto\blockchain-distronet\backend\blockchain\contracts\token.py
 
Author: Christian Bannard
Created: 2025-01-13
 
Description: 
-------------------------------------------------------------------------
HISTORY:
Date      	By	Comments
----------	---	---------------------------------------------------------
'''

from eth_typing import Address
from web3 import Web3
from web3.contract import Contract
from django.conf import settings
import json

class GINTokenContract:
    def __init__(self, web3_provider: Web3):
        self.w3 = web3_provider
        self.contract: Contract = self._load_contract()
        
    def _load_contract(self) -> Contract:
        with open('blockchain/contracts/abi/GINToken.json', 'r') as f:
            contract_json = json.load(f)
            
        return self.w3.eth.contract(
            address=settings.GIN_TOKEN_ADDRESS,
            abi=contract_json['abi']
        )
    
    def deploy(self, deployer_address: Address) -> str:
        """Deploy new token contract"""
        with open('blockchain/contracts/abi/GINToken.json', 'r') as f:
            contract_json = json.load(f)
        
        contract = self.w3.eth.contract(
            abi=contract_json['abi'],
            bytecode=contract_json['bytecode']
        )
        
        tx_hash = contract.constructor().transact({
            'from': deployer_address
        })
        
        tx_receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        return tx_receipt.contractAddress
