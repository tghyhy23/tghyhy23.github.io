import { Outlet } from "react-router-dom";
import FinisherHeader from "../components/FinisherHeader.jsx";
import WordsPopper from "../components/WordsPopper/WordsPopper.jsx";

export default function RootLayout() {
  return (
    <>
      <FinisherHeader />
      <WordsPopper
        words={[
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
        ]}
        spawnEveryMs={500}
        minLifeMs={2200}
        maxLifeMs={3800}
        maxActive={3}
        avoidSelector=".content" // 👈 né vùng chữ lớn ở giữa
        avoidMargin={40} // có thể tăng/giảm
      />
      <div className="app-layer">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
