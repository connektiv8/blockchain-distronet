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
 * File: c:\localdev\crypto\blockchain-distronet\frontend\src\main.tsx
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
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContributorDashboard } from "@/pages/Contributors/ContributorDashboard";

// import { UserDashboard } from "@/pages/Users/UserDashboard";
// import ProtectedRoute from "@/components/navigation/protected-route";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ContributorDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
