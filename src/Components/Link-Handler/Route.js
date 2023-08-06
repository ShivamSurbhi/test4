import React, { useContext } from "react";
import NavigationContext from "../../context/navigation";

const RouteCustom = ({ path, children }) => {
  let { currentPath } = useContext(NavigationContext);

  if (path === currentPath) {
    return children;
  } else {
    return null;
  }
};

export default RouteCustom;
