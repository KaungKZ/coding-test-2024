import React, { memo } from "react";

function Button({ onClick, cls, text, disabled, loading, type }) {
  return (
    <button
      type={type}
      className={`${cls}`}
      onClick={onClick}
      data-dismiss="modal"
      disabled={loading ? true : disabled}
    >
      {loading ? <div className="dot-typing" /> : text}
    </button>
  );
}

export default memo(Button);
