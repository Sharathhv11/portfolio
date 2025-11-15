import React from "react";
import "./study.css";
import profile from "./../../assets/profile.jpeg";

const Study = () => {
  return (
    <section className="study-section">
      <div className="study-section-mainDiv">
        <div className="about-me-container">
          <h1 className="momo-trust-display-regular">About Me</h1>
          <div className="about-me-card">
            <div className="card-image-container">
              <img src={profile} alt="" className="card-image" />
            </div>
            <div className="about-me-p-container">
              <p className="momo-trust-display-regular stack-sans-headline-200">
                Hi, I’m <span className="card-about-name">Sharath HV</span>, a
                Computer Science student at Malnad College of Engineering,
                Hassan. I’m passionate about web development, AI/ML, and data
                structures, always curious to learn how things work behind the
                scenes. I enjoy creating modern, responsive web applications and
                exploring intelligent systems that make technology smarter.
                Problem-solving and continuous learning drive me to improve with
                every project I build. My goal is to become a versatile
                developer who blends creativity, logic, and innovation to craft
                impactful solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Study;
