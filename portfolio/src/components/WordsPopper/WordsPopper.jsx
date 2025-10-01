// components/WordsPopper.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./WordsPopper.scss";

export default function WordsPopper({
  words = [
    "AI-Engineer",
    "UI/UX Design",
    "Web Design",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Frontend",
    "Backend",
    "DevOps",
  ],
  spawnEveryMs = 500,
  minLifeMs = 2600,
  maxLifeMs = 5200,
  maxActive = 28,

  /** Né vùng nội dung trung tâm (VD: ".hero .content" hoặc "#heroContent") */
  avoidSelector = null,
  avoidMargin = 24, // px, nới rộng vùng cần né một chút

  /** góc nghiêng ngẫu nhiên */
  minRotate = -40,
  maxRotate = 40,

  /** bộ gradient để random */
  gradientSets = [
    ["#00EEFF", "#9AE6FF"],            // cyan → light cyan
    ["#00fff2ff", "#29FFC6"],            // lime → aqua
    ["#FFD29D", "#FF8C9D"],            // warm peach → pink
    ["#A18CD1", "#FBC2EB"],            // purple → pink
  ],
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

  // đo vùng cần né (nếu có)
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
    const id = setInterval(measure, 500); // khi layout thay đổi do route outlet
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

        // tìm vị trí không nằm trong avoidRect (thử tối đa 12 lần)
        let left = 0,
          top = 0;
        let tries = 0;
        do {
          left = rand(padW, viewport.w - padW);
          top = rand(padH, viewport.h - padH);
          tries++;
        } while (isInsideAvoid(left, top, avoidRect) && tries < 12);

        const fontSize = rand(18, 32);
        const rotate = rand(minRotate, maxRotate);

        // chọn gradient ngẫu nhiên + màu glow tương ứng (lấy stop 1)
        const gradient = gradientSets[rand(0, gradientSets.length - 1)];
        const glow = toRGBA(gradient[0], 0.35); // nhẹ, có thể chỉnh alpha

        const item = {
          id,
          text: words[rand(0, words.length - 1)],
          left,
          top,
          life,
          fontSize,
          rotate,
          gradient,
          glow,
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
    gradientSets,
    minRotate,
    maxRotate,
  ]);

  // tự gỡ item khi hết life
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
            filter: item.blur ? `blur(${item.blur}px)` : "none",
            transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            // gradient + glow
            "--gradA": item.gradient[0],
            "--gradB": item.gradient[1],
            "--glow": item.glow,
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

// hex -> rgba(a)
function toRGBA(hex, alpha = 0.35) {
  if (!hex) return `rgba(255,255,255,${alpha})`;
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
