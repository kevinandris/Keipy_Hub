"use client";
import { MailCheck, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer_left">
        <a href="/">
          <Image src="/keipy-hub.png" alt="logo" width={200} height={40} />
        </a>
      </div>

      <div className="footer_center">
        <h2>More Links: </h2>
        <ul>
          <li className="lists">About Us</li>
          <li className="lists">Terms and Condition</li>
          <li className="lists">Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h2>Our Contact Information:</h2>
        <div className="footer_right_info">
          <PhoneCall />
          <span>+64 27 550 1019</span>
        </div>
        <div className="footer_right_info">
          <MailCheck />
          <span>kevinandris27@gmail.com</span>
        </div>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  padding: 30px 70px 0 70px;

  h2 {
    font-weight: 600;
    color: #842584;
  }

  .footer_center,
  .footer_right {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .lists {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      cursor: pointer;

      &:hover {
        color: #842584;
      }
    }

    .footer_right_info {
      display: flex;
      gap: 1rem;
      cursor: pointer;

      &:hover {
        color: #842584;
      }
    }
  }

  @include lg {
    padding: 10px 30px;
  }

  @include sm {
    display: none;
  }
`;

export default Footer;
