import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./About.scss";
import me from "../../assets/me.jpg";
const CV_URL = `${import.meta.env.BASE_URL}HyTruong_CV.pdf`;

export default function AboutSection({
  name = "Truong Gia Hy",
  roleLine = "Transforming ideas into digital experiences",
  bio = "I’m studying at RMIT University in Vietnam. I’m passionate about Generative AI, Computer Vision, and Web Development, and I’m on the path to becoming an MLOps engineer.",
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
    { label: "Total Projects", value: 4 },
    { label: "Publications", value: 1 },
    { label: "Years of Experience", value: 2 + "+" },
  ],
  onDownloadCv = () => window.open(CV_URL, "_blank", "noopener"),
  onViewProjects = () => (window.location.href = "/projects"),
}) {
  // ------- Typing effect -------
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
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
  }, [charIndex, isDeleting, wordIndex, currentWord.length]);

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
    <>
      <motion.section
        ref={secRef}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12, margin: "-10% 0px" }} // chỉ animate 1 lần
        transition={{ duration: 0.8 }}
        onAnimationComplete={() => setPinned(true)} // sau reveal -> fixed
        className={`about-aurora ${pinned ? "is-fixed" : ""}`}
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

            {/* Avatar */}
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
                        height="20"
                        viewBox="0 -960 960 960"
                        width="20"
                        fill="#05060f"
                      >
                        <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#05060f"
                      >
                        <path d="M324-96q-54.69 0-93.34-38.66Q192-173.31 192-228v-504q0-54.69 38.66-93.34Q269.31-864 324-864h444v575q-25 0-42.5 17.91t-17.5 43.5q0 25.59 17.5 43.09Q743-167 768-167v71H324Zm-60-250q14-7 28.5-10.5T324-360h12v-432h-12q-25 0-42.5 17.5T264-732v386Zm144-14h288v-432H408v432Zm-144 14v-446 446Zm60 178h326q-7-14-10.5-28t-3.5-31.27q0-16.25 4-31.49Q644-274 651-288H324q-26 0-43 17.5T264-228q0 26 17 43t43 17Z" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 -960 960 960"
                        width="20"
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
    </>
  );
}
