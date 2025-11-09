import React, { useRef, useEffect, useState } from "react";
import profile from "./../../assets/transparent-profile.png";
import "./home.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Download } from "lucide-react";

gsap.registerPlugin(SplitText);

const Home = () => {
  const headerMain = useRef(null);
  const tagline = useRef(null);
  const [fadeStart, setFadeStart] = useState(false);

  useEffect(() => {
    let index = 0;
    const text = "Hi, I’m Sharath";
    headerMain.current.innerText = "";

    const typeEffect = setInterval(() => {
      setTimeout(() => {
        if (index >= text.length) {
          clearInterval(typeEffect);
          setFadeStart(true);
        } else {
          const charToInsert = text.charAt(index++);
          headerMain.current.innerText +=
            charToInsert === " " ? "\u00A0" : charToInsert;
        }
      }, Math.floor(Math.random() * 1000) + 1);
    }, 150);

    return () => clearInterval(typeEffect);
  }, []);

  useEffect(() => {
    if (fadeStart) {
      tagline.current.innerText =
        "A passionate Web Developer crafting modern, interactive experiences.";

      document.fonts.ready.then(() => {
        gsap.set(".container", { opacity: 1 });
        const split = SplitText.create(".home-main-header2", { type: "words" });

        gsap.from(split.words, {
          opacity: 0,
          duration: 2,
          ease: "sine.out",
          stagger: 0.1,
        });
      });
    }
  }, [fadeStart]);

  return (
    <main>
      <div className="home-section-wrapper">
        <div className="home-img-container">
          <img src={profile} alt="profile" />
          <div className="image-back-container">
            <div className="gooey"></div>
          </div>
        </div>

        <div className="home-page-header">
          <div className="main-header-container">
            <h1
              className="momo-trust-display-regular home-main-header home-main-header1"
              ref={headerMain}
            >
              Hi, I’m Sharath
            </h1>
          </div>

          <h5
            className="momo-trust-display-regular home-main-header2 home-main-header"
            ref={tagline}
          ></h5>

          <button className="download-resume">
            <div>
              <Download className="download" />
            </div>
            Resume
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
