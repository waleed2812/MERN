import { EmailOutlined, Google } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

function Home() {
  return (
    <Box px={2}>
      <Typography
        variant="h6"
        sx={({ palette }) => ({ color: palette.primary.main })}
      >
        Color Test
      </Typography>
      <Typography variant="h6" sx={{ color: "primary.300" }}>
        Color Test
      </Typography>
      <Typography variant="h6" sx={{ color: "rgba(94, 114, 228, 0.3)" }}>
        Color Test
      </Typography>
      <TextField
        label="Filled Input"
        type="text"
        placeholder="Filled Input"
        margin="normal"
        autoComplete="name"
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlined />
            </InputAdornment>
          ),
        }}
        required
        fullWidth
      />
      <TextField
        label="Outlined Input"
        type="text"
        placeholder="Outlined Input"
        margin="normal"
        autoComplete="name"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlined />
            </InputAdornment>
          ),
        }}
        required
        fullWidth
      />
      <TextField
        label="Standard Input"
        type="text"
        placeholder="Standard Input"
        margin="normal"
        autoComplete="name"
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlined />
            </InputAdornment>
          ),
        }}
        required
        fullWidth
      />
      <Button variant="contained" fullWidth>
        Primary Button
      </Button>
      <Button variant="outlined" color="primary" fullWidth>
        Primary Outlined Button
      </Button>
      <Button
        startIcon={<Google />}
        variant="outlined"
        color="primary"
        fullWidth
      >
        Google
      </Button>
      <Button variant="contained" color="secondary" fullWidth>
        Secondary Button
      </Button>
    </Box>
  );
}

export default Home;
