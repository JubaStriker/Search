import React from 'react';
import { useCallback, useEffect, useRef, useState } from "react";


const Search = ({ results, onChange, value, onSelect, renderItem }) => {

    const [focusedIndex, setFocusedIndex] = useState(-1);
    const resultContainer = useRef(null);
    const [showResults, setShowResults] = useState(false);
    const [defaultValue, setDefaultValue] = useState("");


    const handleSelection = (selectedIndex) => {
        const selectedItem = results[selectedIndex];
        if (!selectedItem) return resetSearchComplete();
        onSelect && onSelect(selectedItem);
        resetSearchComplete();
    };

    const resetSearchComplete = useCallback(() => {
        setFocusedIndex(-1);
        setShowResults(false);
    }, []);

    const handleKeyDown = (e) => {
        const { key } = e;
        let nextIndexCount = 0;

        // move down
        if (key === "ArrowDown")
            nextIndexCount = (focusedIndex + 1) % results.length;

        // move up
        if (key === "ArrowUp")
            nextIndexCount = (focusedIndex + results.length - 1) % results.length;

        // move up
        if (key === "ArrowUp")
            nextIndexCount = (focusedIndex + results.length - 1) % results.length;

        // hide search results
        if (key === "Escape") {
            resetSearchComplete();
        }

        // select the current item
        if (key === "Enter") {
            e.preventDefault();
            handleSelection(focusedIndex);
        }

        setFocusedIndex(nextIndexCount);
    }

    const handleChange = (e) => {
        if (e.target.value === "") {
            setShowResults(false)
        }
        setDefaultValue(e.target.value);
        onChange && onChange(e);
    };

    useEffect(() => {
        if (!resultContainer.current) return;

        resultContainer.current.scrollIntoView({
            block: "center",
        });
    }, [focusedIndex]);

    useEffect(() => {
        if (results.length > 0 && !showResults) setShowResults(true);

        // if (results.length <= 0) setShowResults(false);
    }, [results]);

    useEffect(() => {
        if (value) setDefaultValue(value);
    }, [value]);

    return (
        <div className="h-screen flex items-center justify-center">
            <div
                tabIndex={1}
                onBlur={resetSearchComplete}
                onKeyDown={handleKeyDown}
                className="relative"
            >
                <input
                    value={defaultValue}
                    onChange={handleChange}
                    className="hidden sm:flex items-center  text-left w-96 px-4 h-12 bg-gray-200 ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-lg text-slate-600"
                    type="search"
                    placeholder="Search users by name, ID, address..."
                />

                {/* Search Results Container */}
                {showResults && (
                    <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
                        {results.length === 0 ? <div className='bg-gray-100 w-full mx-auto h-56 flex items-center justify-center'>
                            <h1 className='text-gray-500 my-auto h-full'> No user found</h1>
                        </div> : <>
                            {results.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onMouseDown={() => handleSelection(index)}
                                        ref={index === focusedIndex ? resultContainer : null}
                                        style={{
                                            backgroundColor:
                                                index === focusedIndex ? "rgba(250,250,210,1)" : "",
                                        }}
                                        className="cursor-pointer hover:bg-[#FAFAD2] hover:bg-opacity-100 p-2"
                                    >
                                        {renderItem(item)}
                                    </div>
                                );
                            })}</>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;