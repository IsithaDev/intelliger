import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "@/App";
import { Login, Register } from "@/pages/auth";
import { CommonPageLayout, RootLayout } from "@/layouts";
import { Explore, Home, Profile, Saved } from "@/pages/root";
import { Dashboard, Users } from "@/pages/dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<RootLayout />}>
        <Route element={<CommonPageLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/users" element={<Users />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
