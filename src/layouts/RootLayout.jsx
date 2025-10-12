import { Outlet } from "react-router-dom";
import FinisherHeader from "../components/BackgroundApp/FinisherHeader.jsx";

export default function RootLayout() {
  return (
    <>
      <FinisherHeader />
    
      <div className="app-layer">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
