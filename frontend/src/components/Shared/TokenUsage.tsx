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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\components\Shared\TokenUsage.tsx
 *
 * Author: Christian Bannard
 * Created: 2025-01-13
 *
 * Description: Token usage component. Displays daily, monthly, and total token usage.
 * -------------------------------------------------------------------------
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	---------------------------------------------------------
 */

import type { FC } from "react";

interface TokenUsageMetrics {
  readonly daily: number;
  readonly monthly: number;
  readonly total: number;
}

interface TokenUsageProps {
  readonly usage: TokenUsageMetrics;
  readonly className?: string;
  readonly showEstimatedCosts?: boolean;
  readonly ratePerToken?: number;
}

const DEFAULT_CLASS_NAME = "";
const DEFAULT_SHOW_COSTS = false;
const DEFAULT_RATE_PER_TOKEN = 0.01;
const DAYS_IN_MONTH = 30;

type CalculateCostFn = (tokens: number) => string;

export const TokenUsage: FC<TokenUsageProps> = ({
  usage,
  className = DEFAULT_CLASS_NAME,
  showEstimatedCosts = DEFAULT_SHOW_COSTS,
  ratePerToken = DEFAULT_RATE_PER_TOKEN,
}) => {
  const calculateCost: CalculateCostFn = (tokens: number): string => {
    return (tokens * ratePerToken).toFixed(2);
  };

  return (
    // This is TSX, not JSX
    <div className={`bg-white rounded-lg shadow p-6 ${className}`.trim()}>
      <h3 className="text-lg font-semibold text-gray-700">Token Usage</h3>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Daily Usage</span>
          <div className="text-right">
            <p className="font-medium">{`${usage.daily} tokens`}</p>
            {showEstimatedCosts && (
              <p className="text-xs text-gray-500">{`≈ ${calculateCost(
                usage.daily
              )} GIN`}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Monthly Usage</span>
          <div className="text-right">
            <p className="font-medium">{`${usage.monthly} tokens`}</p>
            {showEstimatedCosts && (
              <p className="text-xs text-gray-500">{`≈ ${calculateCost(
                usage.monthly
              )} GIN`}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Usage</span>
          <div className="text-right">
            <p className="font-medium">{`${usage.total} tokens`}</p>
            {showEstimatedCosts && (
              <p className="text-xs text-gray-500">{`≈ ${calculateCost(
                usage.total
              )} GIN`}</p>
            )}
          </div>
        </div>

        {usage.monthly > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              {`Daily Average: ${(usage.monthly / DAYS_IN_MONTH).toFixed(
                1
              )} tokens`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export type { TokenUsageMetrics, TokenUsageProps };
