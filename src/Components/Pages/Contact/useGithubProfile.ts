import { useEffect, useState } from "react";

interface GithubProfileProps {
  readonly html_url: string;
  readonly avatar_url: string;
  readonly isLoaded: boolean;
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
        const response = await fetch("https://api.github.com/users/adcichowski");
        const profile = (await response.json()) as GithubProfileProps;
        setProfile({ ...profile, isLoaded: true });
      } catch {
        setProfile({ ...profile, isLoaded: false });
      }
    };
    getGithubProfile();
  }, [profile]);
  return profile;
}

export { useGithubProfile };
