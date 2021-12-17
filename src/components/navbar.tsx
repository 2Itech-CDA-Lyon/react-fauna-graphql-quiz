import { FC } from "react";
import { Link } from "react-router-dom"

const Navbar: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/play">Jouer</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
