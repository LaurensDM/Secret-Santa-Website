import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { SvgIcon } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Nav } from "react-bootstrap";

export default function AuthenticationButton() {
  const { isAuthenticated} = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <Nav.Item>
          <LogoutButton />
        </Nav.Item>
        <Nav.Item>
          <Link to="/account" data-cy='account'>
            <SvgIcon
              className="m-1"
              component={AccountCircleIcon}
              inheritViewBox
              fontSize="large"
            />
          </Link>
        </Nav.Item>
      </>
    );
  }

  return (
    <Nav.Item>
      <LoginButton />
    </Nav.Item>
  );
}
