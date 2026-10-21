import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import FinisherHeader from "../components/BackgroundApp/FinisherHeader.jsx";
import SplashScreen from "../components/SplashScreen/SplashScreen.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

export default function RootLayout() {
    const [isLoading, setIsLoading] = useState(true);

    const handleSplashComplete = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            <FinisherHeader />

            <div className="app-layer">
                <Navbar />

                <main>
                    <Outlet />
                </main>
            </div>

            <AnimatePresence mode="wait">
                {isLoading && (
                    <SplashScreen
                        key="splash"
                        onComplete={handleSplashComplete}
                    />
                )}
            </AnimatePresence>
        </>
    );
}