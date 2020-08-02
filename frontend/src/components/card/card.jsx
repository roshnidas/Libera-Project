// react
import React from "react";

// prop-types
import { node, string, oneOf } from "prop-types";

// classnames package
import classNames from "classnames";

// styles
import "./card.css";

/**
 * @name Card
 * @description function to create the card component
 * @param className
 * @param children
 * @param type
 * @param ...props (other props)
 * @returns card component
 */
const Card = ({ classname, children, type, ...props }) => {
  return (
    <>
      <div
        className={classNames(classname, type, "card-component")}
        data-testid="card"
        {...props}
      >
        {children}
      </div>
    </>
  );
};

Card.propTypes = {
  children: node.isRequired,
  classname: string,
  type: oneOf(["normal-card", "image-card"]),
};

Card.defaultProps = {
  classname: "card-component-background-1",
  type: "normal-card",
};

export default Card;
