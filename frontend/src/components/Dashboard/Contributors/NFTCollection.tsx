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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\components\Dashboard\Contributors\NFTCollection.tsx
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
import { NFT } from "../../../types/contributor";

interface NFTCollectionProps {
  nfts: NFT[];
}

export const NFTCollection: React.FC<NFTCollectionProps> = ({ nfts }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Your NFT Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <div
              key={nft.tokenId}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={nft.metadataUri}
                alt="NFT"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{nft.rarity} NFT</h3>
                <p className="text-gray-600">Token ID: {nft.tokenId}</p>
                <p className="text-gray-600">GIN Value: {nft.ginValue}</p>
                <div className="mt-4">
                  <a
                    href={`https://opensea.io/assets/${nft.tokenId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View on OpenSea
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">
              You haven't earned any NFTs yet. Keep contributing!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
