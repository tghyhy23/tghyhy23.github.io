import { useLayoutEffect, useRef, useState } from "react";
import "./Showcase.scss";
import { motion } from "framer-motion";
import ProjectList from "../ProjectList/ProjectList";
import PublicationList from "../Publication/PublicationList";
import TechstackList from "../Techstack/TechstackList";

export default function Showcase() {
  const [active, setActive] = useState("projects");

  const tabs = [
    { key: "projects", label: "Projects" },
    { key: "publications", label: "Publications" },
    { key: "tech", label: "Tech Stack" },
  ];
  // ------- Pin (fixed) sau khi reveal -------
  const secRef = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [h, setH] = useState(0);

  // đo chiều cao section để tạo spacer chống giật layout
  useLayoutEffect(() => {
    if (!secRef.current) return;
    const measure = () => setH(secRef.current.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(secRef.current);
    return () => ro.disconnect();
  }, []);
  
  return (
    <motion.section
      ref={secRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "-10% 0px"  }} // chỉ animate 1 lần
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => setPinned(true)} // sau reveal -> fixed
      className={`showcase ${pinned ? "is-fixed" : ""}`}
      aria-labelledby="showcase-heading"
    >
      <div className="showcase__head">
        <h2 id="showcase-heading" className="showcase__title">
          Portfolio Showcase
        </h2>
        <p className="showcase__sub">
          <span className="aa__sparkle" aria-hidden>
            ✦
          </span>
          Explore my journey through projects, publications, and technical
          expertise.
          <span className="aa__sparkle" aria-hidden>
            ✦
          </span>
        </p>
      </div>

      <div className="sc-tabs" role="tablist" aria-label="Showcase tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            className="sc-tab"
            data-active={active === t.key}
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="sc-panel" role="tabpanel">
        {active === "projects" && <ProjectList />}
        {active === "publications" && <PublicationList />}
        {active === "tech" && <TechstackList />}
      </div>
    </motion.section>
  );
}
