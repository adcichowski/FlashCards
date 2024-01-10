import { useRouter } from "next/router";
import { useEffect } from "react";
import { BackgroundGame } from "../../components/BackgroundGame/BackgroundGame";

export function GamePage() {
  // const {
  //   state: { isLogin },
  // } = useAuthContext();
  // const router = useRouter();
  // useEffect(() => {
  //   if (!isLogin) router.replace("/login");
  // });

  return (
    <BackgroundGame>
      <h1>There will be cards to choose</h1>
    </BackgroundGame>
  );
}
