/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
export default function CustomCheckboxGenero({
  label,
  icon,
  isFemea,
  checked,
  onClick,
}) {
  return (
    <Box sx={{ width: "112px", height: "112px" }} onClick={onClick}>
      <Box
        display="flex"
        flexDirection="column"
        border="1px solid #ccc"
        borderRadius={4}
      >
        <Box sx={{ padding: 1 }}>
          <Checkbox
            icon={<RadioButtonUnchecked />}
            checkedIcon={<RadioButtonChecked />}
            onClick={onClick}
            checked={checked}
            sx={{
              width: "20px",
              height: "20px",
              color: isFemea ? "#FF4DB8" : "#68F",
              "&.Mui-checked": {
                color: isFemea ? "#FF4DB8" : "#68F",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
            paddingX: 1,
            paddingBottom: 1,
          }}
        >
          {icon && <Box marginTop={1}>{icon}</Box>}
          <Typography sx={{ fontSize: "13px" }}>{label}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
