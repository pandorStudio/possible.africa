import { Outlet, Link } from "react-router-dom";
import Logo from "../assets/logopossibleafrica.png"
import Search from "../components/Search";
// import { Button, Badge } from 'possibleafrica'

function Header() {
  return (
    <>
    <div className="header">
    <nav>
    <Link to="/"> <img src={Logo}/></Link>
   
    {/* <Button appearance="primary" onClick={() => 0}>Do something</Button>
      <Badge onClick={this.clear}>Cool</Badge> */}

      <ul className="menu">
        <li>
          <Link to="/" className="active">Possible</Link>
        </li>
        <li>
          <Link to="/entrepreneur">Entrepreneur</Link>
        </li>
        <li>
          <Link to="/time-to-africa">Time to Africa</Link>
        </li>
      </ul>
    </nav>
    <Search/>
    </div>

    <Outlet />
  </>
  )
}

export default Header