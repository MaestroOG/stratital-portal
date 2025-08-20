import Sidebar from "@/components/dashboardComponents/Sidebar";
import "../globals.css";
import MainContent from "@/components/dashboardComponents/MainContent";
import Header from "@/components/dashboardComponents/Header";
import TawkToChat from "@/components/TawkToChat";

export const metadata = {
  title: "Stratital Client Portal",
  description: "A client portal for managing projects and communication",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-background-gray flex`}
      >
        <Sidebar />
        <MainContent>
          <Header />
          {children}
        </MainContent>
        <TawkToChat />
      </body>
    </html>
  );
}
