import { Outlet } from "react-router";
import { PageHeader } from "../pages/basePages/PageHeader";
import { PageFooter } from "../pages/basePages/PageFooter";

export function RootLayout() {
  return (
    <div>
      <PageHeader />
      <Outlet />
      <PageFooter />
    </div>
  );
}
