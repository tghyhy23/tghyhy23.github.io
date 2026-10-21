import { useState } from "react";
import { motion } from "framer-motion";
import send from "../../assets/send.png";
import arrowIcon from "../../assets/up-right-arrow.png";
import gmail from "../../assets/gmail.png";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";

import "./Contact.scss";

// =========================
// CONTACT INFORMATION
// =========================

const CONTACT_EMAIL = "tgh.hytruong.ai@gmail.com";
const GITHUB_URL = "https://github.com/tghyhy23";
const LINKEDIN_URL = "https://www.linkedin.com/in/gia-hy-truong-0b7b552b7/?isSelfProfile=true";

export default function Contact() {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = () => {
        setIsSending(true);
    };

    return (
        <section className="contact">
            {/* =========================
                CONTACT HEADING
            ========================= */}

            <motion.div className="contact__heading" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2>Let's Connect</h2>

                <p>
                    <span className="aa__sparkle" aria-hidden="true">
                        ✦
                    </span>
                    Have a project in mind or just want to say hello? Feel free to reach out.
                    <span className="aa__sparkle" aria-hidden="true">
                        ✦
                    </span>
                </p>
            </motion.div>

            {/* =========================
                CONTACT GRID
            ========================= */}

            <div className="contact__grid">
                {/* =========================
                    LEFT CARD - PERSONAL INFO
                ========================= */}

                <motion.div className="contact__card contact__card--info" initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    {/* PROFILE */}

                    <div className="contact__profile">
                        <span className="contact__availability">
                            <span className="contact__availability-dot" />
                            Open to Opportunities
                        </span>

                        <h3>Truong Gia Hy</h3>

                        <p>Software Developer</p>
                    </div>

                    {/* =========================
                        CONTACT METHODS
                    ========================= */}

                    <div className="contact__methods">
                        {/* EMAIL */}

                        <a href={`mailto:${CONTACT_EMAIL}`} className="contact__method">
                            <div className="contact__method-icon">
                                <img src={gmail} alt="" className="contact__method-img" aria-hidden="true" />
                            </div>

                            <div className="contact__method-info">
                                <span className="contact__method-label">EMAIL</span>

                                <span className="contact__method-value">{CONTACT_EMAIL}</span>
                            </div>

                            <img src={arrowIcon} alt="" className="contact__method-arrow" aria-hidden="true" />
                        </a>

                        {/* GITHUB */}

                        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="contact__method">
                            <div className="contact__method-icon">
                                <img src={github} alt="" className="contact__method-img" aria-hidden="true" />
                            </div>

                            <div className="contact__method-info">
                                <span className="contact__method-label">GITHUB</span>

                                <span className="contact__method-value">@tghyhy23</span>
                            </div>

                            <img src={arrowIcon} alt="" className="contact__method-arrow" aria-hidden="true" />
                        </a>

                        {/* LINKEDIN */}

                        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="contact__method">
                            <div className="contact__method-icon">
                               <img src={linkedin} alt="" className="contact__method-img" aria-hidden="true" />
                            </div>

                            <div className="contact__method-info">
                                <span className="contact__method-label">LINKEDIN</span>

                                <span className="contact__method-value">Gia Hy Truong</span>
                            </div>

                            <img src={arrowIcon} alt="" className="contact__method-arrow" aria-hidden="true" />
                        </a>
                    </div>
                </motion.div>

                {/* =========================
                    RIGHT CARD - MESSAGE FORM
                ========================= */}

                <motion.div className="contact__card contact__card--form" initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    {/* FORM HEADING */}

                    <div className="contact__form-heading">
                        <h3>Send Me a Message</h3>

                        <p>Fill out the form below and I'll get back to you as soon as possible.</p>
                    </div>

                    {/* MESSAGE FORM */}

                    <form action={`https://formsubmit.co/${CONTACT_EMAIL}`} method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="_subject" value="New Portfolio Contact Message" />

                        <input type="hidden" name="_captcha" value="true" />

                        {/* NAME */}

                        <div className="contact__field">
                            <label htmlFor="contact-name">Your Name</label>

                            <input id="contact-name" type="text" name="name" placeholder="Enter your name" autoComplete="name" required />
                        </div>

                        {/* EMAIL */}

                        <div className="contact__field">
                            <label htmlFor="contact-email">Your Email</label>

                            <input id="contact-email" type="email" name="email" placeholder="Enter your email" autoComplete="email" required />
                        </div>

                        {/* MESSAGE */}

                        <div className="contact__field">
                            <label htmlFor="contact-message">Your Message</label>

                            <textarea id="contact-message" name="message" rows="6" placeholder="Write your message here..." required />
                        </div>

                        {/* SUBMIT BUTTON */}

                        <button type="submit" className="contact__submit" disabled={isSending}>
                            {isSending ? (
                                <>
                                    Sending...
                                    <i className="ri-loader-4-line"></i>
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>

                                    <img src={send} alt="" className="contact__submit-icon" aria-hidden="true" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
