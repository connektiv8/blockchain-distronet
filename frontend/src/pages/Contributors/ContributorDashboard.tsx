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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\pages\Contributors\Dashboard.tsx
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

import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { Stats } from "@/components/Dashboard/Contributors/Stats";
import { NFTCollection } from "@/components/Dashboard/Contributors/NFTCollection";
import { ContributionTable } from "@/components/Dashboard/Contributors/ContributionTable";

import {
  ContributorMetrics,
  NFT,
  Contribution,
  Earnings,
} from "@/types/contributor";

export const ContributorDashboard: React.FC = () => {
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<ContributorMetrics | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [earnings, setEarnings] = useState<Earnings | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!account) return;

      try {
        setLoading(true);

        // Fetch data from your API
        const [metricsData, nftsData, contributionsData, earningsData] =
          await Promise.all([
            fetch(`/api/metrics/${account}`).then((r) => r.json()),
            fetch(`/api/nfts/${account}`).then((r) => r.json()),
            fetch(`/api/contributions/${account}`).then((r) => r.json()),
            fetch(`/api/earnings/${account}`).then((r) => r.json()),
          ]);

        setMetrics(metricsData);
        setNfts(nftsData);
        setContributions(contributionsData);
        setEarnings(earningsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [account]);

  if (loading || !metrics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Stats metrics={metrics} />
      <NFTCollection nfts={nfts} />
      <ContributionTable contributions={contributions} />
      {earnings && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Earnings Overview</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Earned
                </h3>
                <p className="text-3xl font-bold">{earnings.totalEarned} GIN</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Distributed
                </h3>
                <p className="text-3xl font-bold">
                  {earnings.totalDistributed} GIN
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
