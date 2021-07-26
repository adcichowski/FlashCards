import React from "react";

export default function NavigationLinks() {
  const socialLinks = ["facebook", "twitter", "instagram"];
  socialLinks.map((socialName) => {
    return (
      <li className={socialName}>
        <a key={socialName} href={`https://${socialName}.com`}></a>
      </li>
    );
  });
}
