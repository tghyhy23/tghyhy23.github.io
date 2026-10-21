import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import code from "../../assets/code.png";
import star from "../../assets/star.png";
import githubIcon from "../../assets/github.png";

import bloo from "../../assets/bloo.jpg";

import "./ProjectDetail.scss";

// =========================
// PROJECT DATA
// =========================

const projects = {
    "sgtd-web-admin": {
        title: "Sai Gon Tam Duc Web Admin",

        description: "An administrative dashboard developed to manage dental clinic operations, mobile application content, and appointment bookings across multiple branches. The platform provides administrators with centralized tools to maintain clinic information and manage the booking system.",

        technologies: ["React", "Node.js", "CMS"],

        features: ["Centralized dental clinic management", "Appointment and booking management", "Mobile application content management"],

        image: null,

        demo: null,
        github: null,
    },

    "sgtd-mobile-app": {
        title: "Sai Gon Tam Duc Mobile App",

        description: "A mobile application designed to simplify dental appointment booking. Patients can explore available dental services, select clinic branches, and schedule appointments through an intuitive and user-friendly interface.",

        technologies: ["React Native", "JavaScript", "Mobile Development"],

        features: ["Dental appointment booking", "Multiple clinic branch selection", "Dental service exploration"],

        image: null,

        demo: null,
        github: null,
    },

    bloomart: {
        title: "BlooMart: An E-commerce Website",

        description: "A multi-vendor e-commerce platform that connects customers, vendors, and delivery personnel. Customers can explore products, place orders, complete payments through MoMo, and track deliveries through a streamlined shopping experience.",

        technologies: ["MongoDB", "Express.js", "React", "Node.js"],

        features: ["Multi-vendor product marketplace", "MoMo payment integration", "Order and delivery management"],

        image: bloo,

        demo: null,
        github: "https://github.com/PhapLu/Fullstack-Project",
    },

    wander: {
        title: "Wander: A Tourism Forum Website",

        description: "A tourism-focused community platform where users can share travel experiences, discuss destinations, and discover tourism services. The website also provides booking and payment functionality to support convenient travel planning.",

        technologies: ["Web Development", "Frontend", "Backend"],

        features: ["Travel discussion forum", "Tourism service discovery", "Booking and payment integration"],

        image: null,

        demo: null,
        github: "https://github.com/RMIT-Vietnam-Teaching/group-project-cosc3060-cosc3061-2024b-4-0-gpa",
    },
};

// =========================
// ANIMATION
// =========================

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },

    visible: {
        opacity: 1,
        y: 0,
    },
};

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = projects[slug];

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/", {
            state: {
                scrollTo: "projects",
            },
        });
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    }, [slug]);

    if (!project) {
        return (
            <section className="project-detail">
                <div className="project-detail__not-found">
                    <h1>Project Not Found</h1>

                    <Link to="/#projects">← Back to Projects</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="project-detail">
            <div className="project-detail__container">
                {/* =========================
                    LEFT COLUMN
                ========================= */}

                <motion.div className="project-detail__left" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
                    {/* BACK BUTTON */}

                    <button type="button" className="project-detail__back" onClick={handleBack}>
                        ← Back to Projects
                    </button>

                    {/* PROJECT TITLE */}

                    <h1 className="project-detail__title">
                        {project.title}

                        {project.github ? (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-detail__repository" aria-label={`View ${project.title} GitHub repository`}>
                                <img src={githubIcon} alt="" aria-hidden="true" />
                                <span>GitHub Repository</span>
                            </a>
                        ) : (
                            <div className="project-detail__repository">
                                <img src={githubIcon} alt="" aria-hidden="true" />
                                <span>Private Repository</span>
                            </div>
                        )}
                    </h1>

                    <div className="project-detail__divider" />

                    {/* DESCRIPTION */}

                    <p className="project-detail__description">{project.description}</p>

                    {/* =========================
                        PROJECT STATS
                    ========================= */}

                    <div className="project-detail__stats">
                        <div className="project-detail__stat">
                            <div className="project-detail__stat-icon">
                                <img src={code} alt="" />
                            </div>

                            <div className="project-detail__stat-info">
                                <strong>{project.technologies.length}</strong>

                                <span>Technologies Used</span>
                            </div>
                        </div>

                        <div className="project-detail__stat">
                            <div className="project-detail__stat-icon">
                                <img src={star} alt="" />
                            </div>

                            <div className="project-detail__stat-info">
                                <strong>{project.features.length}</strong>

                                <span>Key Features</span>
                            </div>
                        </div>
                    </div>

                    {/* =========================
                        TECHNOLOGIES
                    ========================= */}

                    <div className="project-detail__technologies">
                        <h3>
                            <span>{"</>"}</span>
                            Technologies Used
                        </h3>

                        <div className="project-detail__tech-list">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="project-detail__tech">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* =========================
                    RIGHT COLUMN
                ========================= */}

                <motion.div
                    className="project-detail__right"
                    initial={{
                        opacity: 0,
                        x: 35,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.15,
                    }}
                >
                    {/* PROJECT PREVIEW */}

                    <div className="project-detail__preview">
                        {project.image ? (
                            <img src={project.image} alt={`${project.title} preview`} />
                        ) : (
                            <div className="project-detail__preview-placeholder">
                                <span>PROJECT PREVIEW</span>

                                <h3>{project.title}</h3>
                            </div>
                        )}
                    </div>

                    {/* KEY FEATURES */}

                    <div className="project-detail__features">
                        <h3>
                            <span>✧</span>
                            Key Features
                        </h3>

                        <ul>
                            {project.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
