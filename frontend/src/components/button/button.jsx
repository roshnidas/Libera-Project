// react
import React from "react";

// classnames package
import classnames from "classnames";

// prop-types
import { node, string, bool, func, oneOf } from "prop-types";

// Styles
import "./button.css";

/**
 * @name Button
 * @description function to create the button component
 * @param classname
 * @param appearance
 * @param size
 * @param children
 * @param disabled
 * @param delay
 * @param handleClick
 * @param ...props (other props)
 * @returns button component
 */
const Button = ({
  classname,
  appearance,
  size,
  children,
  disabled,
  handleClick,
  ...props
}) => {
  /**
   * @name clickHandler
   * @description Function handles the button click
   * @param {*} event
   */
  const clickHandler = (event) => {
    handleClick(event);
  };

  let disabledClassName = "";
  if (disabled) {
    disabledClassName = "button-disabled";
  }

  return (
    <>
      <div className="button-component">
        <button
          type="button"
          disabled={disabled}
          onClick={clickHandler}
          data-testid="button"
          className={classnames(
            classname,
            appearance,
            disabledClassName,
            size,
            "button"
          )}
          {...props}
        >
          <p className="button-text" data-testid="button-text">
            {children}
          </p>
        </button>
      </div>
    </>
  );
};

Button.propTypes = {
  children: node.isRequired,
  disabled: bool,
  handleClick: func.isRequired,
  classname: string,
  appearance: string,
  size: oneOf([
    "button-medium",
    "button-large",
    "button-extra-large",
    "button-small",
    "button-extra-small",
  ]),
};

Button.defaultProps = {
  disabled: false,
  classname: "",
  appearance: "",
  size: "button-medium",
};

export default Button;
