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
          "Web Design",
          "MERN Stack",
          "Machine Learning",
          "Deep Learning",
          "NLP",
          "Computer Vision",
        ]}
        spawnEveryMs={450}
        minLifeMs={2200}
        maxLifeMs={3800}
        maxActive={30}
        avoidSelector=".content" // 👈 né vùng chữ lớn ở giữa
        avoidMargin={36} // có thể tăng/giảm
        minRotate={-42}
        maxRotate={42}
      />
      <div className="app-layer">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
