// #6c8bce
import AboutSection from "../components/About/About";
import ShinyText from "../components/ReactBitsLib/ShinyText/ShinyText";
import Showcase from "../components/ShowcaseSection/Showcase";


import "./Home.scss";
// import me from "../assets/me.jpg";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__eyebrow">
            <span className="hero__dot hero__dot--outline" />
            <ShinyText
              text="Welcome to my"
              disabled={false}
              speed={5}
              className="hero__pill hero__pill--outline"
            />
          </div>

          <div className="content">
            <h1 className="hero__title" aria-label="Portfolio">
              TRUONG GIA HY
            </h1>
          </div>

          <div className="hero__under">
            <ShinyText
              text="'s PORTFOLIO"
              disabled={false}
              speed={5}
              className="hero__pill hero__pill--outline"
            />
          </div>
        </div>
      </section>
      <AboutSection />
      <Showcase/>
        
      
    </>
  );
}
