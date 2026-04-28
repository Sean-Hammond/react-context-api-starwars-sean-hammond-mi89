// This page is to display individual details for one specific Star Wars character, planet, etc.
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams, useLocation } from "react-router-dom";

// detailsEntry = the specific object being shown (i.e. Luke Skywalker, Hoth)
export const Details = (cardType) => {
  const { store, dispatch } = useGlobalReducer();

  const { index } = useParams() // The index is the number of the card we clicked on (individual character or planet). This gets passed into this file as a variable when it is included in the URL.
  const location = useLocation

  return (
    <div>
      <h1>{store.baseURL + "/" + cardType + "/" + store.extensionURL + "/" + index}</h1>
      <p>{index}</p>
      {/* <h1>Details for {detailsEntry.preoperties.name}</h1> */}
      {/* <img
        src={
          "https://github.com/breatheco-de/swapi-images/blob/master/public/images/" +
          urlExtension +
          "/" +
          (index + 1) +
          ".jpg?raw=true"
        }
        alt="image of what these details describe"
        className="profile-image"
      /> */}
    </div>
  );
};
