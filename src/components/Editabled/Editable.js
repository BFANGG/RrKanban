import React, { useState } from "react";

import { X } from "react-feather";

import "./Editable.css";

function Editable(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");

  const submission = (e) => {
    if (inputText && props.onSubmit) {
      setInputText("");
      console.log(inputText,props.ListId)
      props.onSubmit(inputText,props.ListId);
    }
    setIsEditable(false);
  };

  return (
    <div className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="editable_edit_footer">
            <button type="submit"><div className="add_btn">{props.buttonText || "Add"}</div></button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${
            props.displayClass ? props.displayClass : ""
          }`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </div>
  );
}

export default Editable;
