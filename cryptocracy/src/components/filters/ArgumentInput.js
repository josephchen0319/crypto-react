import React from "react";

const ArgumentInput = ({ id, handleChange, defaultValue, index, groupId }) => {
  return (
    <input
      type="number"
      className={"center-align arg" + index}
      onChange={handleChange}
      data-id={id}
      defaultValue={defaultValue}
      data-group-id={groupId ? groupId : "newGroup"}
    />
  );
};

export default ArgumentInput;
