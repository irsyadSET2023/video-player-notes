import { Youtube } from "lucide-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../App";

const Header = () => {
  //   const [url, setUrl] = useState("");
  const { notes } = useContext(AppContext);
  const { setUrl } = useContext(AppContext);
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  return (
    <header className="h-[80px] w-full flex justify-between items-center px-6 bg-red-700 sticky top-0 z-50">
      <h3 className="text-2xl font-bold text-white">Logo</h3>
      <div className="border bg-white p-2 rounded flex items-center gap-2">
        {/* <p>Notes Count:{notes.length}</p> */}
        <Youtube className="text-red-700"></Youtube>
        <input
          className="focus:outline-none"
          type="text"
          name="videoURL"
          id="videoURL"
          placeholder="Insert video url here"
          onChange={(e) => handleUrlChange(e)}
        />
      </div>
    </header>
  );
};

export default Header;
