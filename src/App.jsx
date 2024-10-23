import React, { useEffect, useContext } from "react";
import "./App.css";
import Routing from "./Router";
import { DataContext } from "./Componenets/DataProvider/DataProvider";
import { Type } from "./Utility/action.types";
import { auth } from "./Utility/Firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return <Routing />;
}

export default App;
