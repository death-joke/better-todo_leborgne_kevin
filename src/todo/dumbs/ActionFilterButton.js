import React from "react";

export default function ActionFilterButton({
    filter,
    currentFilter,
    onFilterClick,
    children,
  }) {
    const className = filter === currentFilter ? "selected" : "";
    return (
      <li>
        {/*eslint-disable-next-line*/}
        <a href="#" className={className} onClick={() => onFilterClick(filter)}>
          {children}
        </a>
      </li>
    );
  }
  