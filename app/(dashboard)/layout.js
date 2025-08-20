import Sidebar from "@/components/dashboardComponents/Sidebar";
import "../globals.css";
import MainContent from "@/components/dashboardComponents/MainContent";
import Header from "@/components/dashboardComponents/Header";
import CrispChat from "@/components/Crisp";

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
        <CrispChat />
        <Sidebar />
        <MainContent>
          <Header />
          {children}
        </MainContent>
      </body>
    </html>
  );
}
