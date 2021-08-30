import { useEffect, useState } from "react";

interface GithubProfileProps {
  html_url: string;
  avatar_url: string;
  isLoaded: boolean;
}

function useGithubProfile() {
  const [profile, setProfile] = useState<GithubProfileProps>({
    html_url: "",
    avatar_url: "",
    isLoaded: false,
  });
  useEffect(() => {
    if (profile.isLoaded) return;
    const getGithubProfile = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/adcichowski"
        );
        const profile = await response.json();
        await setProfile({ ...profile, isLoaded: true });
      } catch {
        setProfile({ ...profile, isLoaded: false });
      }
    };
    getGithubProfile();
  }, [profile]);
  return profile;
}

export { useGithubProfile };
