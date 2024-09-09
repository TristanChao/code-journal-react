import { Link, Outlet } from 'react-router-dom';

export function Navbar() {
  return (
    <>
      <div className="text-white bg-purple-900  px-20 py-5 flex  flex-wrap header row items-center">
        <h1 className="white-text text-3xl">Code Journal</h1>
        <Link to="/" className="ml-5">
          Entries
        </Link>
      </div>
      <Outlet />
    </>
  );
}
