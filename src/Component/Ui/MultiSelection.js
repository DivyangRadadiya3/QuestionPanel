import React, { useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function MultipleSelect({ label, value,defaultValue, onChange, options }) {
  useEffect(() => {
    console.log(options); // Logs the options to the console
  }, [options]);

  return (
    <FormControl className="container h-full">
      <InputLabel id="subtopic-label" size="small">
        {label}
      </InputLabel>
      <Select
        multiple
        label={label}
        value={value} // Controlled value
        defaultValue={[defaultValue]} 
        onChange={onChange} // Controlled onChange
        renderValue={(selected) => selected.map((s) => s.name).join(", ")}
        size="small"
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option._id} value={option}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

