import { Redirect, Route } from "react-router";
import { useAuthContext } from "../Context/AuthContext";

function PrivateRoute({ path, children: Component }: { readonly children: JSX.Element; readonly path: string }) {
  const { state } = useAuthContext();
  if (!state.isLogin) return <Redirect to="/login" />;
  return (
    <Route exact path={path}>
      {Component}
    </Route>
  );
}
export { PrivateRoute };
