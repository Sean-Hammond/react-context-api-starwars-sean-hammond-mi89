import useGlobalReducer from "../hooks/useGlobalReducer";
import React from "react";

export const Card = ({person, index, addFavorite, deleteFavorite}) => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="col">
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
            <span className="loading bg-info-subtle">Loading...</span>
          )}
          {" kg"}
        </li>
        <li className="text-start">
          Height:{" "}
          {store.people[index] ? (
            store.people[index].properties.height
          ) : (
            <span className="loading bg-info-subtle">Loading...</span>
          )}
          {" cm"}
        </li>
        <li className="text-start">
          Born:{" "}
          {store.people[index] ? (
            store.people[index].properties.birth_year
          ) : (
            <span className="loading bg-info-subtle">Loading...</span>
          )}
        </li>
      </ul>
      <button className="btn btn-primary">More info</button>
      <button
        onClick={() =>
          store.favorites.includes(person.properties.name)
            ? deleteFavorite(person.properties.name)
            : addFavorite(person.properties.name)
        }
        className="btn btn-warning"
      >
        {store.favorites.includes(person.properties.name) ? (
          <i className="fa-solid fa-star"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </button>
    </div>
  );
};
