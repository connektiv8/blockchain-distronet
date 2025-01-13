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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\types\contributor.ts
 *
 * Author: Christian Bannard
 * Created: 2025-01-13
 *
 * Description: Contributor types and interfaces. For example, Contributor, ContributorMetrics, NFT, Contribution, Earnings.
 * -------------------------------------------------------------------------
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */

export interface Contributor {
  id: string;
  walletAddress: string;
  githubUsername?: string;
  name: string;
  avatarUrl: string;
  metrics: ContributorMetrics;
  nfts: NFT[];
  contributions: Contribution[];
  earnings: Earnings;
}

export interface ContributorMetrics {
  totalContributions: number;
  totalImpactScore: number;
  totalGinEarned: string;
  currentLevel: string;
}

export interface NFT {
  tokenId: string;
  rarity: string;
  ginValue: string;
  metadataUri: string;
}

export interface Contribution {
  date: string;
  impactScore: number;
  rewardAmount: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  pullRequestUrl: string;
}

export interface Earnings {
  totalEarned: string;
  totalDistributed: string;
}
