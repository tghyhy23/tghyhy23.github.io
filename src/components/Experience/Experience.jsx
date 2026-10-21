import { useRef } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";

import { useState } from "react";

import "./Experience.scss";

const experiences = [
    {
        id: 1,
        period: "2023 — Present",
        role: "Bachelor of Information Technology",
        company: "RMIT University Vietnam",
        description: "Building a strong foundation in software engineering and system design through hands-on projects. Gaining practical experience in full-stack development, mobile applications, and cloud technologies.",
        technologies: ["Java", "Node.js", "JavaScript", "React", "Kotlin", "AWS"],
    },
    {
        id: 2,
        period: "03/2023 — 09/2024",
        role: "AI Researcher",
        company: "The Neurone Group",
        description: "Conducted research in academic papers about AI and Cybersecurity. Explored machine learning, deep learning, and generative AI through independent study and practical experimentation.",
        technologies: ["Python", "GenAI", "Deep Learning", "Machine Learning"],
    },
    {
    id: 3,
    period: "12/2025 — 06/2026",
    role: "Software Engineer Intern",
    company: "EONSR Tech",
    description:
        "Contributed to chatbot research and development, developed a dental appointment booking application for SGTD, and built an admin dashboard for managing the application's content.",
    technologies: ["React", "React Native", "Node.js", "CMS", "Mobile App"],
},
];

export default function Experience() {
    const sectionRef = useRef(null);

    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 75%", "end 25%"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        setProgress(latest);
    });

    return (
        <section ref={sectionRef} className="experience">
            <div className="experience__heading">
                <span className="experience__eyebrow">MY JOURNEY</span>

                <h2>Work Experience</h2>

                <p className="aa__role">
                    <span className="aa__sparkle" aria-hidden>
                        ✦
                    </span>
                    A timeline of my professional growth, experiences, and achievements.
                    <span className="aa__sparkle" aria-hidden>
                        ✦
                    </span>
                </p>
            </div>

            <div className="experience__timeline">
                {/* Background timeline */}
                <div className="experience__line">
                    <motion.div
                        className="experience__line-progress"
                        style={{
                            scaleY: smoothProgress,
                        }}
                    />
                </div>

                {experiences.map((experience, index) => {
                    const nodePosition = (index + 0.5) / experiences.length;

                    const isActive = progress >= nodePosition;

                    return (
                        <div className={`experience__item ${index % 2 === 0 ? "experience__item--left" : "experience__item--right"}`} key={experience.id}>
                            {/* Timeline node */}
                            <div className={`experience__node ${isActive ? "is-active" : ""}`} />

                            {/* Experience card */}
                            <motion.article
                                className="experience__card"
                                initial={{
                                    opacity: 0,
                                    y: 45,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.25,
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                }}
                            >
                                <span className="experience__period">{experience.period}</span>

                                <h3>{experience.role}</h3>

                                <h4>{experience.company}</h4>

                                <p>{experience.description}</p>

                                <div className="experience__technologies">
                                    {experience.technologies.map((technology) => (
                                        <span key={technology}>{technology}</span>
                                    ))}
                                </div>
                            </motion.article>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
