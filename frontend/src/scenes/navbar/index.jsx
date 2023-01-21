import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  search,
  Message,
  DarkMode,
  LightMode,
  Notification,
  Help,
  Menu,
  Close,
  Search,
} from "@mui/icons-material";
import { setMode, setLogout } from "../../state/index.js";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(falase);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width : 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.neutral.background.default;
  const primaryLight = theme.palette.neutral.primary.light;
  const alt = theme.palette.neutral.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ "&:hover": { color: primaryLight, cursor: pointer } }}
        >
          SocialMedia
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            paddding="0.1rem 1.5rem"
          >
            {" "}
            <InputBase placeholder="Search... " />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      /* DeskTopNav */

    </FlexBetween>
  );
};

export default NavBar;
