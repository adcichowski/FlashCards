import { Redirect, Route, RouteComponentProps } from "react-router";
import { useAuthContext } from "../Context/AuthContext";

export default function PrivateRoute({
  component: Component,
  path,
  exact = true as const,
  ...rest
}: {
  component: React.ComponentType<RouteComponentProps>;
  path: string;
  exact: boolean;
}) {
  const { state } = useAuthContext();
  if (!state.isLogin) return <Redirect to="/login" />;
  return (
    <Route
      path={path}
      exact
      render={(routeProps) => <Component {...routeProps} {...rest} />}
    />
  );
}
