"use client";

import styled from "styled-components";
import Video from "next-video";
import keipyVideo from "@/videos/video-one.mp4";
const Hero = () => {
  return (
    <HeroStyle>
      <Video
        className="video"
        src={keipyVideo}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      ></Video>
      <h1 className="title">
        The beautiful thing about learning is that nobody can take it away from
        you. - <span>B. B. King</span>
      </h1>
    </HeroStyle>
  );
};

const HeroStyle = styled.div`
  width: 100%;
  height: 85vh;

  .video {
    width: 100%;
    height: 70vh;
    --media-object-fit: cover;
  }

  .title {
    font-size: 34px;
    position: absolute;
    left: 0;
    width: 100%;
    padding: 100px 50px 50px;
    color: #fff;
    background: linear-gradient(to top, #842584, rgba(0, 0, 0, 0));
  }
`;

export default Hero;
