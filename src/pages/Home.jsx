import AboutSection from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Experience from "../components/Experience/Experience";
import ShinyText from "../components/ReactBitsLib/ShinyText/ShinyText";
import Showcase from "../components/ShowcaseSection/Showcase";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Home.scss";

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const target = location.state?.scrollTo;

        if (!target) return;

        const frameId = requestAnimationFrame(() => {
            const section = document.getElementById(target);

            if (!section) return;

            const offset = 50;

            const sectionPosition = section.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: Math.max(0, sectionPosition - offset),
                behavior: "smooth",
            });

            // Clear navigation state
            navigate("/", {
                replace: true,
                state: null,
            });
        });

        return () => cancelAnimationFrame(frameId);
    }, [location.state, navigate]);

    return (
        <>
            {/* HOME */}
            <section id="home" className="hero">
                <div className="hero__inner">
                    <div className="hero__eyebrow">
                        <ShinyText text="Welcome to" disabled={false} speed={5} className="hero__pill hero__pill--outline" />
                    </div>

                    <div className="content">
                        <h1 className="hero__title" aria-label="Portfolio">
                            TRUONG GIA HY
                        </h1>
                    </div>

                    <div className="hero__under">
                        <ShinyText text="'s PORTFOLIO" disabled={false} speed={5} className="hero__pill hero__pill--outline" />
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <div id="about">
                <AboutSection />
            </div>

            <div id="experiences">
                <Experience />
            </div>

            {/* PROJECTS / SHOWCASE */}
            <div id="projects">
                <Showcase />
            </div>

            <div id="contact">
                <Contact />
            </div>
        </>
    );
}
