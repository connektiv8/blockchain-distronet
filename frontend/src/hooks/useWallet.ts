/*
 * Copyright (c) 2025 Christian Bannard
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * -------------------------------------------------------------------------
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\hooks\useWallet.ts
 *
 * Author: Christian Bannard
 * Created: 2025-01-13
 *
 * Description: Wallet hook for connecting and disconnecting wallets using Web3.
 * -------------------------------------------------------------------------
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */

import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 11155111], // Mainnet and Sepolia
});

export const useWallet = () => {
  const { activate, deactivate, active, account, library } = useWeb3React();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Connect wallet
  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      await activate(injected);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    try {
      deactivate();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  // Verify wallet ownership
  const verifyWallet = async () => {
    if (!library || !account) return;

    try {
      const message = `Verify wallet ownership for GinkyAI: ${Date.now()}`;
      const signer = library.getSigner();
      const signature = await signer.signMessage(message);

      const response = await fetch("/api/wallet/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: account,
          signature,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify wallet");
      }

      return true;
    } catch (error) {
      console.error("Error verifying wallet:", error);
      return false;
    }
  };

  return {
    connect,
    disconnect,
    verifyWallet,
    isConnecting,
    isConnected: active,
    account,
    error,
  };
};
