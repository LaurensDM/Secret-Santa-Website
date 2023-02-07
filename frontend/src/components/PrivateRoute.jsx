import { Route, useLocation, Navigate } from "react-router-dom";
// import { useSession } from "../contexts/AuthProvider"

export default function PrivateRoute({children, ...rest}) {
  const {isAuthed} = false;
  const {pathname} = useLocation();

  return (
		<Route {...rest}>
			{
				isAuthed ? (
					children
				) : (
					<Navigate from={pathname} to="/login" />
				)
			}
		</Route>
  )
}