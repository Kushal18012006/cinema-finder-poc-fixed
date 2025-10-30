import { Chip, IconButton, ListItem, ListItemText } from "@mui/material";
import { MdCall, MdOutlineLocationOn } from "react-icons/md";
import { format } from "d3-format";

const dispatchMapSnapTo = (lat, lng) => {
  console.log("Triggering map flyTo for cinema: ", lat, lng);

  // Directly access the map instance if available in the global scope
  const map = window.mapInstance || window.activeMap;

  if (map && lat && lng) {
    // Smoothly animate the map to the selected cinema
    map.flyTo([lat, lng], 14, { animate: true });
  } else {
    // Fallback: dispatch custom event if map instance not ready yet
    dispatchEvent(new CustomEvent("map.snapTo", { detail: { lat, lng } }));
  }
};

const CinemaListItem = ({
  name,
  lat,
  lng,
  phoneNumber,
  distance,
  ...otherProps
}) => {
  return (
    <ListItem>
      <ListItemText>
        {name}
        {distance && (
          <Chip
            size="small"
            sx={{ ml: 1 }}
            label={`${format(",.1f")(distance)} km`}
          />
        )}
      </ListItemText>
      {phoneNumber && (
        <IconButton component="a" href={`tel:${phoneNumber}`}>
          <MdCall />
        </IconButton>
      )}
      <IconButton onClick={() => dispatchMapSnapTo(lat, lng)}>
        <MdOutlineLocationOn />
      </IconButton>
    </ListItem>
  );
};
export default CinemaListItem;
