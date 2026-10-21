import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./SplashScreen.scss";

export default function SplashScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 1200;
        const start = performance.now();

        let frameId;

        const updateProgress = (now) => {
            const elapsed = now - start;

            // Chuẩn hóa thời gian từ 0 đến 1
            const t = Math.min(elapsed / duration, 1);

            // Linear: chạy đều từ 0% đến 100% trong 1200ms
            const percentage = t * 100;

            setProgress(percentage);

            if (t < 1) {
                frameId = requestAnimationFrame(updateProgress);
            } else {
                onComplete?.();
            }
        };

        frameId = requestAnimationFrame(updateProgress);

        return () => cancelAnimationFrame(frameId);
    }, [onComplete]);

    return (
        <motion.div
            className="splash-screen"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.8,
                    ease: "easeInOut",
                },
            }}
        >
            <motion.div
                className="splash-screen__content"
                initial={{
                    opacity: 0,
                    y: 5,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeOut",
                }}
            >
                <h1 className="splash-screen__logo">
                    Truong Gia Hy
                </h1>

                <p className="splash-screen__subtitle">
                    PORTFOLIO LOADING
                </p>

                <div className="splash-screen__progress">
                    <div
                        className="splash-screen__progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}