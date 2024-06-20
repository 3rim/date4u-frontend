import { NavLink } from 'react-router-dom';
function NavBar() {
    return (
        <>
            <nav className="nav">
                <ul className=''>
                    <li>
                        {/*hardcoded "logged in" state. I am profile 1*/}
                        <NavLink to="/profile/2">Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">Suche</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;