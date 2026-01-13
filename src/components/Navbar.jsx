import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #E2E8F0",
        color: "#1E293B"
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", height: 70 }}>
          
          {/* Logo Section */}
          <Box 
            onClick={() => navigate("/dashboard")} 
            sx={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 1.5 }}
          >
            <Box sx={{ bgcolor: "#3B82F6", color: "white", p: 1, borderRadius: 2, display: "flex" }}>
                <SchoolRoundedIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.5px" }}>
              EduManager
            </Typography>
          </Box>

          {/* Actions */}
          <Box display="flex" gap={2}>
             <Button 
                onClick={() => navigate("/dashboard")}
                sx={{ 
                    color: "#64748B", 
                    fontWeight: 600, 
                    textTransform: "none",
                    "&:hover": { color: "#3B82F6", bgcolor: "transparent" }
                }}
            >
                Dashboard
            </Button>
            <Button 
                startIcon={<LogoutRoundedIcon />} 
                onClick={() => navigate("/")}
                variant="outlined"
                sx={{ 
                    borderColor: "#E2E8F0", 
                    color: "#1E293B",
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { borderColor: "#CBD5E1", bgcolor: "#F8FAFC" }
                }}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}