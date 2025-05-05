// Dropdown.js
"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { TaskObject } from "../TaskList/page";

type DropdownProps = {
    sorter: keyof TaskObject;
    ascending: boolean;
    onSortSelect: (key: keyof TaskObject) => void;
    onToggleDirection: () => void;
};

const sorters = {
    UUID: "Date Created",
    title: "Title",
    completed: "Status",
};

const Dropdown: React.FC<DropdownProps> = ({ sorter, onSortSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSorter, setSelectedSorter] =
        useState<keyof typeof sorters>(sorter);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleSelect = (key: keyof typeof sorters) => {
        onSortSelect(key);
        setSelectedSorter(key);
        setIsOpen(false);
    };

    return (
        <div className="flex justify-center">
            <div className="relative inline-block text-left">
                {/* Dropdown button */}
                <button
                    type="button"
                    className="inline-flex justify-center w-full
                               rounded-md border border-gray-300
                               shadow-sm px-4 py-2 bg-white text-sm
                               font-medium text-black hover:bg-gray-50"
                    onClick={toggleDropdown}
                >
                    Sort by {sorters[selectedSorter]}
                    <FaCaretDown className="ml-2" />
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div
                        className="origin-top-right absolute
                                    right-0 mt-2 w-56 rounded-md
                                    shadow-lg bg-white ring-1 ring-black
                                    ring-opacity-5 focus:outline-none"
                    >
                        <div className="py-1">
                            {(
                                Object.keys(sorters) as (keyof typeof sorters)[]
                            ).map((sorter, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-4 py-2
                                               text-sm text-black
                                               hover:bg-gray-100"
                                    onClick={() => handleSelect(sorter)}
                                >
                                    {sorters[sorter]}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
