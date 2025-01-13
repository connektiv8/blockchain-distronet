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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\components\Navigation\TopNav.tsx
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

// import React, { useState, useEffect } from "react";
import * as React from "react";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "viola",
  "papermache",
  "petals",
  "darkpetals",
  "melon",
  "embers",
  "seaside",
  "turtlepowered",
  "strawberryfields",
  "velvet",
  "fourseasons",
  "sunrise",
  "sunset",
  "cafe",
  "candlelight",
  "beachside",
  "traversecity",
  "rosey",
  "fruitbasket",
  "darkstrawberry",
  "kiwi",
  "desertstorm",
  "spartanglory",
  "springgarden",
  "storm",
  "breeze",
  "tron",
  "electricity",
  "liming",
  "lavenderfield",
  "christmastree",
  "scorchedearth",
  "northmelbourne",
  "chauvinist",
  "inverselavenderfield",
  "mauvemist",
  "darkenedlime",
  "metro90s",
  "pumpkin",
  "darkandstormynight",
  "luke",
  "clearbright",
  "conscripted",
  "citrus",
  "wookiehere",
  "wascalywabbit",
  "hotpinkery",
];

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  icon: Icon,
  label,
  onClick,
}) => (
  <button className="h-9 w-9 rounded-full " onClick={onClick}>
    <Icon className="h-4 w-4" />
  </button>
);

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    onThemeChange(newTheme);
  };

  return (
    <select
      value={currentTheme}
      onChange={handleThemeChange}
      className="select select-bordered select-text select-sm w-40"
    >
      {themes.map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};

interface TopNavbarProps {
  className?: string;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({
  className,
  currentTheme,
  onThemeChange,
}) => {
  return (
    <div className={`px-4 flex items-center justify-between ${className}`}>
      {/* Left section */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">GinkyAI</h1>
      </div>

      {/* Middle section - Search */}
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects & conversations..."
            className="input input-bordered w-full pl-10 h-9 min-h-0"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
        />

        <div className="flex items-center gap-2 pl-2">
          <img
            src="/api/placeholder/32/32"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex items-center gap-1">
            <span className="text-sm">Hi,</span>
            <span className="text-sm font-semibold"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
