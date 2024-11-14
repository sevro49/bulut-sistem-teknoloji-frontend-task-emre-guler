import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder } from "@/store/requestSlice";
import { RootState } from "@/store/store";

import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const FilterList = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state: RootState) => state.requests.sortOrder);

  const [order, setOrder] = useState("");

  // When the component mounts, set the filter to match the sortOrder
  useEffect(() => {
    setOrder(sortOrder === "default" ? "" : sortOrder); // Default to empty string if it's 'default'
  }, [sortOrder]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setOrder(value); // Update filter state

    // Dispatch the new sort order
    dispatch(setSortOrder(value as "ascending" | "descending" | "default"));
  };

  return (
    <section id="filter-list" className="mt-12">
      <FormControl sx={{ minWidth: 120, width: 180 }}>
        <Select
          value={order}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            padding: "0",
            "& .MuiSelect-select": {
              padding: "10px 16px",
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        >
          <MenuItem value={""}>Suggested</MenuItem> {/* Default option */}
          <MenuItem value="ascending">Lowest Price</MenuItem>
          <MenuItem value="descending">Highest Price</MenuItem>
        </Select>
      </FormControl>
    </section>
  );
};

export default FilterList;
