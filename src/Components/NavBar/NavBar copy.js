import "./NavBar.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/mybirthdays">Mes anniversaires</NavLink>
            </li>
            <li>
              <NavLink to="/about">A propos</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
