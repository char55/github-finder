import React from "react";

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <nav>{title}</nav>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fa fa-github"
};
export default Navbar;
