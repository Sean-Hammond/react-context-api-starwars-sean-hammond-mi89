import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getPeople = async () => {
    const response = await fetch(store.baseURL + "/people/?expanded=true");
    if (!response.ok) {
      console.log(
        "getPeople response not ok: ",
        response.status,
        response.statusText,
      );
      return;
    }
    const data = await response.json();
    dispatch({ type: "set_people", payload: data.results });
    console.log("people array fetched: ", data.results);
  };

  const addFavorite = (nameOfFavorite) => {
    !store.favorites.includes(nameOfFavorite) &&
      dispatch({
        type: "set-favorites",
        payload: nameOfFavorite,
      });
    console.log("Favorites array: ", store.favorites);
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="text-center mt-5">
      <p className="bg-info">
        <i className="fa-solid fa-wrench"></i> Website still under development
      </p>
      <section>
        <h2 className="text-warning bg-dark text-start ms-5">Characters</h2>
        <div className="row flex-nowrap overflow-auto">
          {store.people.length > 0 ? (
            store.people.map((person, index) => {
              return (
                <div
                  key={person.properties.id}
                  className="col"
                  onClick={() => addFavorite(person.properties.name)}
                >
                  <img
                    src={
                      "https://github.com/breatheco-de/swapi-images/blob/master/public/images/people/" +
                      (index + 1) +
                      ".jpg?raw=true"
                    }
                    alt=""
                    className="profile-image"
                  />
                  <h3>{person.properties.name}</h3>
                  <ul>
                    <li className="text-start">
                      Mass:{" "}
                      {store.people.length > 0 ? (
                        store.people[index].properties.mass
                      ) : (
                        <span className="loading bg-info-subtle">
                          Loading...
                        </span>
                      )}
                      {" kg"}
                    </li>
                    <li className="text-start">
                      Height:{" "}
                      {store.people[index] ? (
                        store.people[index].properties.height
                      ) : (
                        <span className="loading bg-info-subtle">
                          Loading...
                        </span>
                      )}
                      {" cm"}
                    </li>
                    <li className="text-start">
                      Born:{" "}
                      {store.people[index] ? (
                        store.people[index].properties.birth_year
                      ) : (
                        <span className="loading bg-info-subtle">
                          Loading...
                        </span>
                      )}
                    </li>
                  </ul>
                </div>
              );
            })
          ) : (
            <h2 className="loading bg-info-subtle ms-5">Loading...</h2>
          )}
        </div>
      </section>
    </div>
  );
};
