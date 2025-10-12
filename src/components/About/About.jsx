import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./About.scss";
import me from "../../assets/me.jpg";
const CV_URL = `${import.meta.env.BASE_URL}HyTruong_CV.pdf`;

export default function AboutSection({
  name = "Truong Gia Hy",
  roleLine = "Transforming ideas into digital experiences",
  bio = "I am studying at RMIT University in Vietnam. I have a big enthusiastic with Generative AI, Computer Vision and Web Development. I am on the road to become a MLOps. ",
  interest = [
    "MLOps",
    "UI/UX Design",
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Computer Vision",
    "Web Development",
  ],
  stats = [
    { label: "Total Projects", value: 1 },
    { label: "Certificates", value: 1 },
    { label: "Years of Experience", value: 1 },
  ],
  onDownloadCv = () => window.open(CV_URL, "_blank", "noopener"),
  onViewProjects = () => (window.location.href = "/projects"),
}) {
  // ------- Typing effect state -------
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Speeds (ms)
  const TYPING_MS = 60;
  const DELETING_MS = 38;
  const HOLD_MS = 8000;

  const words = interest && interest.length ? interest : ["Frontend"];
  const currentWord = words[wordIndex % words.length];
  const display = currentWord.slice(0, charIndex);

  useEffect(() => {
    let timer;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        timer = setTimeout(() => setCharIndex((c) => c + 1), TYPING_MS);
      } else {
        timer = setTimeout(() => setIsDeleting(true), HOLD_MS);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => setCharIndex((c) => c - 1), DELETING_MS);
      } else {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [
    charIndex,
    isDeleting,
    wordIndex,
    currentWord.length,
    TYPING_MS,
    DELETING_MS,
    HOLD_MS,
    words.length,
  ]);

  return (
    <motion.section
      initial={{ opacity: 0, translateY: "100%" }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.8 }}
      className="about-aurora "
      aria-labelledby="about-heading"
    >
      <div className="aa__inner">
        <header className="aa__head">
          <h2 id="about-heading" className="aa__title">
            About Me
          </h2>
          <p className="aa__role" role="note">
            <span className="aa__sparkle" aria-hidden>
              ✦
            </span>
            {roleLine}
            <span className="aa__sparkle" aria-hidden>
              ✦
            </span>
          </p>
        </header>

        <div className="aa__body">
          {/* Left column */}
          <div className="aa__left">
            <p className="aa__eyebrow">Hello, I&apos;m</p>
            <h3 className="aa__name">{name}</h3>

            {/* Typing line */}
            <p className="aa__typing" aria-live="polite">
              <span className="aa__typing-text">{display}</span>
              <span className="aa__caret" aria-hidden />
            </p>

            <p className="aa__bio">{bio}</p>

            <div className="aa__actions">
              <button
                className="aa__btn aa__btn--primary"
                onClick={onDownloadCv}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                  <path
                    d="M12 3v10m0 0 4-4m-4 4-4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 15v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Download CV</span>
              </button>
              <button
                className="aa__btn aa__btn--ghost"
                onClick={onViewProjects}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                  <path
                    d="M5 12h14m-7-7 7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>View Projects</span>
              </button>
            </div>
          </div>

          {/* ... avatar block of yours ... */}

          <div className="aa__avatar">
            <img src={me} alt="" />
          </div>
        </div>

        {/* Stats row */}
        <ul className="aa__stats" aria-label="Key stats">
          {stats.map((s, i) => (
            <li className="aa__card" key={i}>
              <div className="aa__cardLeft">
                <div className="aa__chip" aria-hidden>
                  {i === 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#05060f"
                    >
                      <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#05060f"
                    >
                      <path d="M480-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#05060f"
                    >
                      <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="aa__metric">{String(s.value)}</div>
                  <div className="aa__label">{s.label}</div>
                </div>
              </div>
              <div className="aa__cardRight" aria-hidden>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
