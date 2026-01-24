import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.85)", 
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E2E8F0",
        color: "#1E293B",
        zIndex: 1000
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", height: 70 }}>
          
          {/* Logo Section */}
          <Box 
            onClick={() => navigate("/dashboard")} 
            sx={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 1.5 }}
          >
            <Box sx={{ bgcolor: "#3B82F6", color: "white", p: 1, borderRadius: 2, display: "flex", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" }}>
                <SchoolRoundedIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.5px", background: "linear-gradient(90deg, #1e293b 0%, #334155 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Smartcampus
            </Typography>
          </Box>

          {/* Actions */}
          <Box display="flex" gap={2}>
             <Button 
                onClick={() => navigate("/dashboard")}
                sx={{ 
                    color: isActive("/dashboard") ? "#3B82F6" : "#64748B", 
                    bgcolor: isActive("/dashboard") ? "#EFF6FF" : "transparent",
                    fontWeight: 600, 
                    px: 2,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": { color: "#3B82F6", bgcolor: "#EFF6FF" }
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
                    color: "#475569",
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2,
                    "&:hover": { borderColor: "#CBD5E1", bgcolor: "#F8FAFC", color: "#0F172A" }
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