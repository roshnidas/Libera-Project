const handleClickOutside = (node, clickedOutside) => (event) => {
  if (node && !node.current.contains(event.target)) {
    clickedOutside();
  }
};

export default handleClickOutside;