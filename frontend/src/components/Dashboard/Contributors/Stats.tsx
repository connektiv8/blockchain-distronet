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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\components\Dashboard\Stats.tsx
 *
 * Author: Christian Bannard
 * Created: 2025-01-13
 *
 * Description: Stats component for the dashboard to display the contributor's metrics
 * -------------------------------------------------------------------------
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */

import React from "react";
import { ContributorMetrics } from "../../../types/contributor";

interface StatsProps {
  metrics: ContributorMetrics;
}

export const Stats: React.FC<StatsProps> = ({ metrics }) => {
  const stats = [
    {
      title: "Total Contributions",
      value: metrics.totalContributions,
    },
    {
      title: "Impact Score",
      value: metrics.totalImpactScore,
    },
    {
      title: "GIN Earned",
      value: metrics.totalGinEarned,
    },
    {
      title: "Current Level",
      value: metrics.currentLevel,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
          <p className="text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
