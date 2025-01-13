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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\components\Shared\WalletBalance.tsx
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

import { type FC } from "react";

interface WalletBalanceProps {
  readonly balance: string;
  readonly symbol?: string;
  readonly className?: string;
}

export const WalletBalance: FC<WalletBalanceProps> = ({
  balance,
  symbol = "GIN",
  className = "",
}: WalletBalanceProps) => {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-700">Wallet Balance</h3>
      <div className="mt-2">
        <p className="text-3xl font-bold">{`${balance} ${symbol}`}</p>
      </div>
    </div>
  );
};

export type { WalletBalanceProps };
