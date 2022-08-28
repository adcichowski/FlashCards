import { useRouter } from "next/router";
import { useAuthContext } from "src/context/AuthContext";
import { BackgroundGame } from "../../components/BackgroundGame/BackgroundGame";

export function GamePage() {
  const {
    state: { isLogin },
  } = useAuthContext();
  const router = useRouter();

  if (!isLogin) router.replace("/login");

  return (
    <BackgroundGame>
      <h1>There will be cards to choose</h1>
    </BackgroundGame>
  );
}
