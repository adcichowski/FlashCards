import { Redirect, Route } from "react-router";
import { useAuthContext } from "../Context/AuthContext";

export default function PrivateRoute({
  component: Component,
  path,
  exact = true as const,
  ...rest
}: {
  component: any;
  path: string;
  exact: boolean;
}) {
  const { state } = useAuthContext();
  if (!state.isLogin) return <Redirect to="/login" />;
  return (
    <Route
      path={path}
      exact
      render={(routeProps) => <Component {...routeProps} />}
    />
  );
}
