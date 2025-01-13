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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\pages\Contributors\UserDashboard.tsx
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

// src/pages/Users/Dashboard.tsx

import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  WalletBalance,
  TokenUsage,
  TransactionHistory,
} from "../../components/Dashboard/Users";

import { UserMetrics, Transaction, TokenStats } from "../../types/user";

export const UserDashboard: React.FC = () => {
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!account) return;

      try {
        setLoading(true);

        // Fetch data from your API
        const [metricsData, transactionsData, tokenStatsData] =
          await Promise.all([
            fetch(`/api/users/metrics/${account}`).then((r) => r.json()),
            fetch(`/api/users/transactions/${account}`).then((r) => r.json()),
            fetch(`/api/users/token-stats/${account}`).then((r) => r.json()),
          ]);

        setMetrics(metricsData);
        setTransactions(transactionsData);
        setTokenStats(tokenStatsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [account]);

  if (loading || !metrics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Wallet & Token Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <WalletBalance balance={metrics.ginBalance} />
        <TokenUsage usage={metrics.tokenUsage} />
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Network Status
          </h3>
          <p className="text-sm text-gray-600">
            Connected to: {metrics.network}
          </p>
          <p className="text-sm text-gray-600">
            Gas Price: {metrics.gasPrice} gwei
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
        <TransactionHistory transactions={transactions} />
      </div>

      {/* Token Usage Stats */}
      {tokenStats && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Token Usage Statistics</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Tokens Used
                </h3>
                <p className="text-3xl font-bold">{tokenStats.totalUsed}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Available Balance
                </h3>
                <p className="text-3xl font-bold">{tokenStats.available} GIN</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Usage Rate
                </h3>
                <p className="text-3xl font-bold">{tokenStats.usageRate}/day</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
