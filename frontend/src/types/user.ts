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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\types\users.ts
 *
 * Author: Christian Bannard
 * Created: 2025-01-13
 *
 * Description: User types and interfaces. For example, User, UserMetrics, Transaction, TokenStats.
 * -------------------------------------------------------------------------
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */

export interface User {
  id: string;
  walletAddress?: string;
  username: string;
  // other user-specific fields
}

export interface UserMetrics {
  ginBalance: string;
  tokenUsage: {
    daily: number;
    monthly: number;
    total: number;
  };
  network: string;
  gasPrice: number;
}

export interface Transaction {
  id: string;
  type: "SEND" | "RECEIVE" | "USE" | "PURCHASE";
  amount: string;
  timestamp: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  hash: string;
}

export interface TokenStats {
  totalUsed: number;
  available: string;
  usageRate: number;
}
