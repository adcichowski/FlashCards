import { ContactPage } from "src/pages/contact/page/ContactPage";

import { GithubProfileProps } from "../src/pages/contact/components/GithubProfile";

export async function getStaticProps() {
  const responseData = await fetch("https://api.github.com/users/adcichowski");
  const githubProfile = await responseData.json();
  return {
    props: { ...githubProfile },
  };
}
export default function Contact(data: GithubProfileProps) {
  return <ContactPage githubProfile={data} />;
}
Contact.displayName = "Contact";
