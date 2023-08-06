import React, { Fragment, useContext } from "react";
import NavigationContext from "../../context/navigation";


function RouterLink({ to, children }) {
  const { navigationTo } = useContext(NavigationContext);

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();
    navigationTo(to);
  };

  return (
    <Fragment>
      <li
        className="nav-item"
        aria-disabled="true"
        onClick={handleClick}
        title={children}
      >
        <a className="nav-link">
          {children}
        </a>
      </li>
    </Fragment>
  );
}

export default RouterLink;
