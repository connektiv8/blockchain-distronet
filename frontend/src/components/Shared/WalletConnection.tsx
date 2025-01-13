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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\components\WalletConnection.tsx
 *
 * Author: Christian Bannard
 * Created: 2025-01-13
 *
 * Description:
 * -------------------------------------------------------------------------
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */

import React from "react";
import { useWallet } from "@/hooks/useWallet";

export const WalletConnection: React.FC = () => {
  const { connect, disconnect, isConnecting, isConnected, account, error } =
    useWallet();

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          {`${account?.slice(0, 6)}...${account?.slice(-4)}`}
        </span>
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={connect}
        disabled={isConnecting}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
