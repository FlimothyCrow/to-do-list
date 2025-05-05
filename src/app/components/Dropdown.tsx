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

const Dropdown: React.FC<DropdownProps> = ({
    sorter,
    ascending,
    onSortSelect,
    onToggleDirection,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSorter, setselectedSorter] = useState("Sort By");

    const sorters = ["UUID", "title", "completed"];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (sorter: string) => {
        onSortSelect(sorter as keyof TaskObject);
        setselectedSorter(sorter);
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
                    {selectedSorter}
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
                            {sorters.map((sorter, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-4 py-2
                                               text-sm text-black
                                               hover:bg-gray-100"
                                    onClick={() => handleSelect(sorter)}
                                >
                                    {sorter}
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
