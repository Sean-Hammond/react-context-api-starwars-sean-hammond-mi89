export const initialStore = () => {
  return {
    baseURL: "https://www.swapi.tech/api",
    people: [],
    planets: [],
    species: [],
    favorites: [],
    cardTypes: ["people", "planets", "species"],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set-people":
      console.log("action: ", action.payload);
      return {
        ...store,
        people: action.payload,
      };

    case "set-planets":
      console.log("action: ", action.payload);
      return {
        ...store,
        planets: action.payload,
      };

    case "set-species":
      console.log("action: ", action.payload);
      return {
        ...store,
        planets: action.payload,
      };

    case "set-favorites":
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };

    case "set-filteredFavorites":
      return {
        ...store,
        favorites: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
