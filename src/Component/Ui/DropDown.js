import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function DropDown() {
  const [rank, setRank] = useState("");

  const handleChange = (event) => {
    setRank(event.target.value);
  };
  return (
    <>
      <Box
        sx={{
          "& .MuiSelect-select": {
            paddingRight: 1,
            paddingLeft: 1,
            paddingTop: 1,
            paddingBottom: 1,
          },
          '& fieldset': { borderRadius: 2 }
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="ranks">Rank</InputLabel>
          <Select
            labelId="ranks"
            id="ranks"
            value={rank}
            label="ranks"
            onChange={handleChange}
          >
            <MenuItem value="1st">1st</MenuItem>
            <MenuItem value="2nd">2nd</MenuItem>
            <MenuItem value="3rd">3rd</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
