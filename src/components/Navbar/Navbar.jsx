import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Navbar.scss";

const navItems = [
    { label: "Home", target: "home" },
    { label: "About", target: "about" },
    { label: "Experiences", target: "experiences" },
    { label: "Projects", target: "projects" },
    { label: "Contact", target: "contact" },
];

const offsets = {
    home: 0,
    about: 90,
    experiences: 50,
    projects: 50,
    contact: 0,
};

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home");

    const navigate = useNavigate();
    const location = useLocation();

    const pendingTarget = useRef(null);

    // =========================
    // SCROLL TO SECTION
    // =========================

    const scrollToSection = (target) => {
        const section = document.getElementById(target);

        if (!section) return;

        let targetPosition;

        if (target === "contact") {
            const documentHeight = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );

            targetPosition = Math.max(
                0,
                documentHeight - window.innerHeight
            );
        } else {
            const offset = offsets[target] ?? 90;

            const sectionPosition =
                section.getBoundingClientRect().top +
                window.scrollY;

            targetPosition = Math.max(
                0,
                sectionPosition - offset
            );
        }

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
        });
    };

    // =========================
    // NAVIGATE
    // =========================

    const handleNavigate = (target) => {
        setActiveSection(target);

        if (location.pathname !== "/") {
            pendingTarget.current = target;

            navigate("/");
            return;
        }

        scrollToSection(target);
    };

    // =========================
    // NAVIGATION FROM DETAIL
    // =========================

    useEffect(() => {
        if (location.pathname !== "/") return;

        const target = pendingTarget.current;

        if (!target) return;

        pendingTarget.current = null;

        const frameId = requestAnimationFrame(() => {
            scrollToSection(target);
        });

        return () => cancelAnimationFrame(frameId);
    }, [location.pathname]);

    // =========================
    // ACTIVE SECTION
    // =========================

    useEffect(() => {
        if (location.pathname !== "/") return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            const documentHeight = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );

            const maxScroll = Math.max(
                0,
                documentHeight - viewportHeight
            );

            const contactSection =
                document.getElementById("contact");

            if (contactSection) {
                const rect =
                    contactSection.getBoundingClientRect();

                const contactVisible =
                    rect.top <= viewportHeight * 0.6 &&
                    rect.bottom > 0;

                const isNearBottom =
                    scrollY >= maxScroll - 30;

                if (contactVisible || isNearBottom) {
                    setActiveSection("contact");
                    return;
                }
            }

            const scrollPosition = scrollY + 150;

            let currentSection = "home";

            navItems.forEach(({ target }) => {
                if (target === "contact") return;

                const section =
                    document.getElementById(target);

                if (!section) return;

                const sectionPosition =
                    section.getBoundingClientRect().top +
                    scrollY;

                if (sectionPosition <= scrollPosition) {
                    currentSection = target;
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        window.addEventListener("resize", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [location.pathname]);

    return (
        <header className="navbar">
            <nav
                className="navbar__container"
                aria-label="Main navigation"
            >
                <button
                    className="navbar__brand"
                    onClick={() => handleNavigate("home")}
                    type="button"
                >
                    tghyhy
                </button>

                <div className="navbar__links">
                    {navItems.map(({ label, target }) => (
                        <button
                            key={target}
                            type="button"
                            onClick={() => handleNavigate(target)}
                            className={`navbar__link ${
                                activeSection === target
                                    ? "is-active"
                                    : ""
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    );
}