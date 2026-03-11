import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const deleteFavorite = (nameOfFavorite) => {
    const filteredFavorites = store.favorites.filter((favoriteToCheck) => {
      return favoriteToCheck != nameOfFavorite;
    });
    dispatch({
      type: "set-filteredFavorites",
      payload: filteredFavorites,
    });
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img
              id="site-logo"
              src={
                "https://upload.wikimedia.org/wikipedia/commons/c/ce/Star_wars2.svg"
              }
            />
          </span>
        </Link>
        <span>
          <h1 className="text-decoration-none">Star Wars Database</h1>
        </span>

        <div className="dropdown ml-auto">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="false"
            aria-expanded="false"
          >
            Favorites <strong>({store.favorites.length})</strong>
          </button>
          <ul className="dropdown-menu">
            <li>Characters:</li>
            <li>
              <ul>
                {store.favorites.map((favorite, index) => {
                  return (
                    <div>
                      <li key={index}>
                        {/* NOTE: CHANGE THIS KEY TO SOMETHING MORE UNIQUE */}
                        {favorite}
                        <button
                          className="invisibleButton text-danger"
                          onClick={() => deleteFavorite(favorite)}
                        >
                          <i className="fa-solid fa-square-xmark"></i>
                        </button>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
