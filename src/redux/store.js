import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

function saveToLocalStorage(state) {
    try {
      const storageState = JSON.stringify(state);
      localStorage.setItem("cart", storageState);
    } catch (e) {
      console.warn(e);
    }
  }

function loadFromLocalStorage() {
try {
    const storageState = localStorage.getItem("cart");
    if (storageState === null) return undefined;
    return JSON.parse(storageState);
} catch (e) {
    console.warn(e);
    return undefined;
}
}

const store = createStore(rootReducer, loadFromLocalStorage(), composeWithDevTools(applyMiddleware(thunk)));

// composeWithDevTools(applyMiddleware(...middleware)
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;