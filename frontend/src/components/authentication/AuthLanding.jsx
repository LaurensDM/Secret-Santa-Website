import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import Error from '../Error';
import LoginButton from './LoginButton';

export default function AuthLanding() {
  const { error, isAuthenticated, isLoading} = useAuth0();

  if (error) {
    return(
    <div className="title d-flex w-75 jumbotron text-bg-dark mx-auto justify-content-center align-items-center text-center" style={{height: "50vh"}}>
      <div className="row">
        <div className="col">
          <h1>Login failed</h1>
          <p>
            Sorry, we were unable to sign you in, the error below might be useful.
          </p>
          <Error error={error} />
          <span className='btn p-0 btn-info' style={{borderRadius: "5px"}}><LoginButton /></span>
          
        </div>
      </div>
    </div>);
  }

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/account" />;
  }

  if (!isLoading && !isAuthenticated) {
    return (
      <div className="title d-flex flex-column w-75 jumbotron text-bg-dark mx-auto justify-content-center align-items-center text-center" style={{height: "50vh"}}>
            <h1>Login required</h1>
            <p>You need to login to access this page.</p>
            <LoginButton />
      </div>
    );
  }

  return (
    <div className="title d-flex w-75 jumbotron text-bg-dark mx-auto justify-content-center align-items-center text-center" style={{height: "50vh"}}>
      <div className="row">
        <div className="col">
          <h1>Signing in</h1>
          <p>
            Please wait while we sign you in!
          </p>
        </div>
      </div>
    </div>
  );
}