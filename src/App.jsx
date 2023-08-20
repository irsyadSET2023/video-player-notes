import { createContext, useState } from "react";
import Home from "./pages/Home";

export const AppContext = createContext(null);

function App() {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState([]);
  return (
    <AppContext.Provider value={{ url, setUrl, notes, setNotes }}>
      <Home />
    </AppContext.Provider>
  );
}

export default App;
