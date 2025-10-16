import Sidebar from "@/components/dashboardComponents/Sidebar";
import "../globals.css";
import MainContent from "@/components/dashboardComponents/MainContent";
import Header from "@/components/dashboardComponents/Header";
import TawkToChat from "@/components/TawkToChat";
import { getUser, getUserFromDB } from "@/lib/user";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

export const metadata = {
  title: "Stratital Client Portal",
  description: "A client portal for managing projects and communication",
};


export default async function RootLayout({ children }) {
  const user = await getUser();
  const userFromDB = await getUserFromDB();
  return (
    <html lang="en">
      <head>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-GKDBGGXRL3`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GKDBGGXRL3', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
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
          <Header userFromDB={userFromDB} pfpLink={user?.profilePictureUrl} />
          {children}
        </MainContent>
        {user && user.role !== "superadmin" && <TawkToChat />}

      </body>
    </html>
  );
}
