import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Card } from "../components/Card.jsx";

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
    dispatch({ type: "set-people", payload: data.results });
    console.log("people array fetched: ", data.results);
  };

  const getPlanets = async () => {
    const response = await fetch(store.baseURL + "/planets/?expanded=true");
    if (!response.ok) {
      console.log(
        "getPlanets response not ok: ",
        response.status,
        response.statusText,
      );
      return;
    }
    const data = await response.json();
    dispatch({ type: "set-planets", payload: data.results });
    console.log("planets array fetched: ", data.results);
  };

  const addFavorite = (nameOfFavorite) => {
    !store.favorites.includes(nameOfFavorite) &&
      dispatch({
        type: "set-favorites",
        payload: nameOfFavorite,
      });
    console.log("Favorites array: ", store.favorites);
  };

  const deleteFavorite = (nameOfFavorite) => {
    const filteredFavorites = store.favorites.filter((favoriteToCheck) => {
      return favoriteToCheck != nameOfFavorite;
    });
    dispatch({
      type: "set-filteredFavorites",
      payload: filteredFavorites,
    });
  };

  useEffect(() => {
    getPeople();
    getPlanets();
  }, []);

  return (
    <div className="text-center mt-5">
      <p className="bg-info">
        <i className="fa-solid fa-wrench"></i>Developer's note: It took a very
        very long time for the third row to load, so I only kept 2.
      </p>
      <section>
        <h2 className="text-warning bg-dark text-start ms-5">Characters</h2>
        {/* People cards: */}
        <div className="row flex-nowrap overflow-auto">
          {store.people.length > 0 ? (
            store.people.map((person, index) => {
              return (
                <Card
                  cardType={"people"}
                  card={person}
                  index={index}
                  addFavorite={addFavorite}
                  deleteFavorite={deleteFavorite}
                  urlExtension={"people"}
                  key={person.properties.id}
                />
              );
            })
          ) : (
            <h2 className="loading bg-info-subtle ms-5">Loading...</h2>
          )}
        </div>
        <h2 className="text-warning bg-dark text-start ms-5">Planets</h2>
        {/* Planets cards: */}
        <div className="row flex-nowrap overflow-auto">
          {store.planets.length > 0 ? (
            store.planets.map((planet, index) => {
              return (
                <Card
                  cardType={"planets"}
                  card={planet}
                  index={index}
                  addFavorite={addFavorite}
                  deleteFavorite={deleteFavorite}
                  urlExtension={"planets"}
                  key={planet.properties.id}
                />
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
