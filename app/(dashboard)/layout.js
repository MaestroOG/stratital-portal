import Sidebar from "@/components/dashboardComponents/Sidebar";
import "../globals.css";
import MainContent from "@/components/dashboardComponents/MainContent";
import Header from "@/components/dashboardComponents/Header";
import TawkToChat from "@/components/TawkToChat";
import { getUser } from "@/lib/user";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Stratital Client Portal",
  description: "A client portal for managing projects and communication",
};


export default function RootLayout({ children }) {
  const user = getUser();
  return (
    <html lang="en">
      <body
        className={`antialiased bg-background-gray flex`}
      >
        <NextTopLoader
          color="#F33C38"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Sidebar />
        <MainContent>
          <Header />
          {children}
        </MainContent>
        {user?.role !== 'superadmin' && <TawkToChat />}
      </body>
    </html>
  );
}
