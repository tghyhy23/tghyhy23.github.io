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
const LINKEDIN_URL = "https://www.linkedin.com/in/gia-hy-truong-0b7b552b7/";

export default function Contact() {
    const [isSending, setIsSending] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSending) return;

        const form = event.currentTarget;
        const formData = new FormData(form);
        setIsSending(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(
                `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
                {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const result = await response.json();
            if (result.success !== true && result.success !== "true") {
                throw new Error(result.message || "Form submission was not accepted.");
            }

            form.reset();
            setSubmitStatus("success");
        } catch (error) {
            console.error("Contact form submission failed:", error);
            setSubmitStatus("error");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="contact">
            {/* CONTACT HEADING */}
            <motion.div
                className="contact__heading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2>Let's Connect</h2>
                <p>
                    <span className="aa__sparkle" aria-hidden="true">✦</span>
                    Have a project in mind or just want to say hello? Feel free to reach out.
                    <span className="aa__sparkle" aria-hidden="true">✦</span>
                </p>
            </motion.div>

            {/* CONTACT GRID */}
            <div className="contact__grid">
                {/* LEFT CARD - PERSONAL INFO */}
                <motion.div
                    className="contact__card contact__card--info"
                    initial={{ opacity: 0, x: -35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="contact__profile">
                        <span className="contact__availability">
                            <span className="contact__availability-dot" />
                            Open to Opportunities
                        </span>
                        <h3>Truong Gia Hy</h3>
                        <p>Software Developer</p>
                    </div>

                    <div className="contact__methods">
                        {/* EMAIL - OPEN GMAIL COMPOSE */}
                        <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__method"
                        >
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

                {/* RIGHT CARD - MESSAGE FORM */}
                <motion.div
                    className="contact__card contact__card--form"
                    initial={{ opacity: 0, x: 35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="contact__form-heading">
                        <h3>Send Me a Message</h3>
                        <p>Fill out the form below and I'll get back to you as soon as possible.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
                        {/* FormSubmit AJAX does not support the standard CAPTCHA flow. */}
                        <input type="hidden" name="_captcha" value="false" />

                        <div className="contact__field">
                            <label htmlFor="contact-name">Your Name</label>
                            <input id="contact-name" type="text" name="name" placeholder="Enter your name" autoComplete="name" required />
                        </div>

                        <div className="contact__field">
                            <label htmlFor="contact-email">Your Email</label>
                            <input id="contact-email" type="email" name="email" placeholder="Enter your email" autoComplete="email" required />
                        </div>

                        <div className="contact__field">
                            <label htmlFor="contact-message">Your Message</label>
                            <textarea id="contact-message" name="message" rows="6" placeholder="Write your message here..." required />
                        </div>

                        <button type="submit" className="contact__submit" disabled={isSending}>
                            {isSending ? (
                                <>
                                    <span>Sending...</span>
                                    <i className="ri-loader-4-line" aria-hidden="true" />
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <img src={send} alt="" className="contact__submit-icon" aria-hidden="true" />
                                </>
                            )}
                        </button>

                        {submitStatus === "success" && (
                            <p className="contact__success" role="status">
                                ✓ Your message has been submitted successfully!
                            </p>
                        )}
                        {submitStatus === "error" && (
                            <p className="contact__error" role="alert">
                                ✕ Unable to send your message. Please try again.
                            </p>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
