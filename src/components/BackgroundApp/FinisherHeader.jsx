import { useEffect, useRef } from "react";

export default function FinisherHeader() {
  const hostRef = useRef(null);
  const initedRef = useRef(false);

  useEffect(() => {
    if (initedRef.current) return;      // tránh init lại khi đổi route/HMR
    initedRef.current = true;

    const init = () => {
      if (!window.FinisherHeader) return;
      new window.FinisherHeader({
        count: 3,
        size: { min: 1000, max: 1200, pulse: 0 },
        speed: { x: { min: 0.1, max: 0.8 }, y: { min: 0.1, max: 0.8 } },
        colors: {
          background: "#13151C",
          particles: ["#0B1221", "#0B1221", '#0E1730'],
          // 084c6f
        },
        blending: "overlay",
        opacity: { center: 1, edge: 0.1 },
        skew: 0,
        shapes: ["c"],
      });
    };

    if (window.FinisherHeader) {
      init();
    } else {
      // nạp script 1 lần từ /public
      const s = document.createElement("script");
      s.src = "/finisher-header.es5.min.js";
      s.defer = true;
      s.onload = init;
      document.head.appendChild(s);
    }

    // giữ background xuyên suốt, chỉ dọn khi unmount app
    return () => {
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={hostRef} className="finisher-header" aria-hidden="true" />;
}
