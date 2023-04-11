import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Header = () => {
  /* Gets authenticatedUser from UserContext */
  const { authenticatedUser } = useContext(UserContext);

  return (
    <>
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
            {/* If authenticatedUser isn't null and the array has a property that contains emailAddress, the Welcome message appears */}
            {authenticatedUser !== null &&
            authenticatedUser.hasOwnProperty("emailAddress") ? (
              <>
                <h1>
                  Welcome back {authenticatedUser.firstName}{" "}
                  {authenticatedUser.lastName}!
                </h1>
                <Link to="/signout">Sign Out</Link>
              </>
            ) : (
              <ul className="header--signedout">
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
