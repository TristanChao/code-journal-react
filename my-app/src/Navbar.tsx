import { Link, Outlet } from 'react-router-dom';

export function Navbar() {
  return (
    <>
      <div className="header row align-center">
        <h1 className="white-text">Code Journal</h1>
        <Link to="/" className>
          Entries
        </Link>
      </div>
      <Outlet />
    </>
  );
}
