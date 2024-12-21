import React from "react";

function EditToolbar(props) {
  const { setRows, setRowModesModel, questionType } = props;

  const handleClick = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const newRow =
      questionType === "statement"
        ? { id, statement: "", isNew: true }
        : { id, pairA: "", pairB: "", isNew: true };

    setRows((oldRows) => [...oldRows, newRow]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: {
        mode: "edit",
        fieldToFocus: questionType === "statement" ? "statement" : "pairA",
      },
    }));
  };

  return (
    <div className="flex justify-between p-2">
      <button
