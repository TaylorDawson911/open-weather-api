import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ForecastCard = ({ date, temperature, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="center" alignContent="center">
        <Box mb={1}>
          {icon}
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {date}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt="1px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {temperature}
        </Typography>
      </Box>
    </Box>
  );
};


export default ForecastCard;