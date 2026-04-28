import useGlobalReducer from "../hooks/useGlobalReducer";
import React from "react";
import { Link } from "react-router-dom";
import { Details } from "../pages/Details";

export const Card = ({
  cardType,
  card,
  index,
  addFavorite,
  deleteFavorite,
  urlExtension,
}) => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="col">
      <img
        src={
          "https://github.com/breatheco-de/swapi-images/blob/master/public/images/" +
          urlExtension +
          "/" +
          (index + 1) +
          ".jpg?raw=true"
        }
        alt="image of what this card describes"
        className="profile-image"
      />
      <h3>
        <Link
          to={"/details/" + index}
          detailsEntry={card}
          urlExtension={urlExtension}
          cardType={cardType}
        >
          {card.properties.name}
        </Link>
      </h3>
      {cardType === "people" && (
        <ul>
          <li className="text-start">
            Mass:{" "}
            {store.people[index] ? (
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
      )}
      {cardType === "planets" && (
        <ul>
          <li className="text-start">
            Population:{" "}
            {store.planets[index] ? (
              store.planets[index].properties.population
            ) : (
              <span className="loading bg-info-subtle">Loading...</span>
            )}
          </li>
          <li className="text-start">
            Geography:{" "}
            {store.planets[index] ? (
              store.planets[index].properties.climate +
              " " +
              store.planets[index].properties.terrain
            ) : (
              <span className="loading bg-info-subtle">Loading...</span>
            )}
          </li>
        </ul>
      )}

      <button className="btn btn-primary">More info</button>
      <button
        onClick={() =>
          store.favorites.includes(card.properties.name)
            ? deleteFavorite(card.properties.name)
            : addFavorite(card.properties.name)
        }
        className="btn btn-warning"
      >
        {store.favorites.includes(card.properties.name) ? (
          <i className="fa-solid fa-star"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </button>
    </div>
  );
};
