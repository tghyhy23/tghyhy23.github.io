// components/WordsPopper.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./WordsPopper.scss";

export default function WordsPopper({
  words = [
    "AI-Engineer",
    "UI/UX Design",
    "Web Develop",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Generative AI",
    "Computer Vision",
    "MLOps",
    "NLP",
  ],
  spawnEveryMs = 500,
  minLifeMs = 2600,
  maxLifeMs = 5200,
  maxActive = 3,
  avoidSelector = null,
  avoidMargin = 40,
}) {
  const [items, setItems] = useState([]);
  const [avoidRect, setAvoidRect] = useState(null);
  const idRef = useRef(0);
  const timerRef = useRef(null);

  const viewport = useMemo(
    () => ({
      w: typeof window !== "undefined" ? window.innerWidth : 1200,
      h: typeof window !== "undefined" ? window.innerHeight : 800,
    }),
    []
  );

  useEffect(() => {
    function measure() {
      if (!avoidSelector) {
        setAvoidRect(null);
        return;
      }
      const el = document.querySelector(avoidSelector);
      if (!el) return;
      const r = el.getBoundingClientRect();
      setAvoidRect({
        left: r.left - avoidMargin,
        top: r.top - avoidMargin,
        right: r.right + avoidMargin,
        bottom: r.bottom + avoidMargin,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    const id = setInterval(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      clearInterval(id);
    };
  }, [avoidSelector, avoidMargin]);

  useEffect(() => {
    function spawn() {
      setItems((curr) => {
        if (curr.length >= maxActive) return curr;

        const life = rand(minLifeMs, maxLifeMs);
        const id = idRef.current++;

        const padW = Math.floor(viewport.w * 0.06);
        const padH = Math.floor(viewport.h * 0.06);

        let left = 0,
          top = 0;
        let tries = 0;
        do {
          left = rand(padW, viewport.w - padW);
          top = rand(padH, viewport.h - padH);
          tries++;
        } while (isInsideAvoid(left, top, avoidRect) && tries < 12);

        const fontSize = rand(18, 32);

        const item = {
          id,
          text: words[rand(0, words.length - 1)],
          left,
          top,
          life,
          fontSize,
        };
        return [...curr, item];
      });
    }

    timerRef.current = setInterval(spawn, spawnEveryMs);
    return () => clearInterval(timerRef.current);
  }, [
    maxActive,
    maxLifeMs,
    minLifeMs,
    spawnEveryMs,
    viewport.w,
    viewport.h,
    words,
    avoidRect,
  ]);

  useEffect(() => {
    const timeouts = items.map((item) =>
      setTimeout(() => {
        setItems((curr) => curr.filter((x) => x.id !== item.id));
      }, item.life)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [items]);

  return (
    <div className="words-popper" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="words-popper__item"
          style={{
            left: item.left,
            top: item.top,
            fontSize: `${item.fontSize}px`,
            animationDuration: `${item.life}ms`,
            // KHÔNG set rotate ở đây để keyframes điều khiển xoay
            transform: `translate(-50%, -50%)`,
            // Truyền góc xoay cho keyframes dùng
            "--rot": `${item.rotate}deg`,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isInsideAvoid(x, y, rect) {
  if (!rect) return false;
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
