import { NavLink } from 'react-router-dom';
function NavBar() {
    return (
        <>
            <nav className="nav">
                <ul className=''>
                    <li>
                        <NavLink to="/">Profile</NavLink>
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