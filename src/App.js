import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const data = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pineapple",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "ugli fruit",
  "watermelon"
];

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [pastQueries, setPastQueries] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      if (divRef.current && divRef.current.contains(event.target)) {
        console.log("Clicked inside the div!");

        return;
      }
      console.log("Clicked outside input box!");
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;

    const lowercaseQuery = value.toLowerCase(); // Convert query to lowercase
    setQuery(value);
    setResults(
      lowercaseQuery
        ? data.filter((item) => item.toLowerCase().includes(lowercaseQuery)) // Convert items to lowercase
        : []
    );
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPastQueries((prevQueries) => [query, ...prevQueries.slice(0, 4)]);
    setQuery("");
    setResults([]);
  };

  const handleItemClick = (value) => {
    setQuery(value);
    setResults([]);
  };

  return (
    <form className="formWrapper" onSubmit={handleSubmit}>
      <div className="mt-5">
        <input
          type="text"
          className="inputbox"
          placeholder="Type something..."
          value={query}
          onChange={handleInputChange}
          ref={inputRef}
          onFocus={handleInputFocus}
        />
        {query && (
          <button
            type="button"
            className="clear-btn btnclr"
            onClick={handleClear}
          >
            X
          </button>
        )}
        <button className="button" type="submit">
          Submit
        </button>
        {isDropdownOpen && (
          <div className="dropDown" ref={divRef}>
            {pastQueries.length === 0 && (
              <>
                <span>No Recent Searches yet!!</span>
                <hr />
              </>
            )}
            {results.slice(0, 5).map((item, index) => (
              <div
                className="listHover"
                key={index}
                onClick={() => handleItemClick(item)}
                dangerouslySetInnerHTML={{
                  __html: item.replace(
                    new RegExp(`(${query})`, "gi"),
                    "<strong>$1</strong>"
                  )
                }}
              />
            ))}
            {pastQueries.length > 0 && (
              <div>
                <hr />
                <span>
                  <strong>Recent Searches</strong>
                </span>
                {pastQueries.map((item, index) => (
                  <div
                    className="listHover"
                    onClick={() => handleItemClick(item)}
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default Autocomplete;
