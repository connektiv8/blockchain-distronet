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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\providers\Web3Provider.tsx
 *
 * Author: Christian Bannard
 * Created: 2025-01-13
 *
 * Description: Web3 provider for connecting to the Ethereum network.
 * -------------------------------------------------------------------------
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */

import { Web3Provider as EthersWeb3Provider } from "@ethersproject/providers";
import type { JsonRpcProvider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { useEffect } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function getLibrary(provider: any): JsonRpcProvider {
  const library = new EthersWeb3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => window.location.reload());
      window.ethereum.on("accountsChanged", () => window.location.reload());
    }
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  );
};
