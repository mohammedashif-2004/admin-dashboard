import React from "react";
import {
  Typography, Grid, Card, Box, Container, alpha,
  Avatar, Chip, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Icons
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';

const menuItems = [
  { title: "Attendance", subtitle: "Manage student daily records", icon: <GroupRoundedIcon />, path: "/attendance", color: "#0d9488" },
  { title: "Academic Results", subtitle: "Grade processing & transcripts", icon: <DescriptionRoundedIcon />, path: "/results", color: "#0f766e" },
  { title: "Notice Board", subtitle: "Broadcast campus updates", icon: <CampaignRoundedIcon />, path: "/notices", color: "#115e59" },
  { title: "Analytics", subtitle: "Performance & data trends", icon: <BarChartRoundedIcon />, path: "/reports", color: "#134e4a" },
  { title: "Event Calendar", subtitle: "Schedules & academic terms", icon: <EventAvailableRoundedIcon />, path: "/calendar", color: "#0d9488" },
  { title: "Time Table", subtitle: "Classroom & faculty allocation", icon: <ScheduleRoundedIcon />, path: "/timetable", color: "#0f766e" },
];

export default function ProfessionalDashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pb: { xs: 5, md: 10 } }}>

      {/* --- HERO SECTION --- */}
      <Box sx={{
        position: 'relative',
        pt: { xs: 3, md: 5 },
        pb: { xs: 10, md: 15 },
        px: { xs: 2, md: 5 },
        background: 'linear-gradient(135deg, #064e3b 0%, #134e4a 50%, #0f766e 100%)',
        boxShadow: '0 20px 40px -15px rgba(6, 78, 59, 0.3)',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl">
          {/* Responsive Navbar */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 4, md: 8 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.12)', p: 1, borderRadius: 2, display: 'flex', backdropFilter: 'blur(8px)' }}>
                <WidgetsRoundedIcon sx={{ color: 'white', fontSize: { xs: 18, md: 22 } }} />
              </Box>
              <Typography sx={{ color: 'white', fontWeight: 900, letterSpacing: { xs: 1, md: 2.5 }, fontSize: { xs: '0.8rem', md: '0.95rem' } }}>
                BCA.CORE
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
              <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.08)' }}>
                <NotificationsNoneRoundedIcon fontSize="small" />
              </IconButton>
              <Avatar
                onClick={() => navigate("/profile")}
                sx={{ cursor: "pointer" }}
              >
                AD
              </Avatar>
            </Box>
          </Box>

          {/* Large Watermark Text (Hidden on very small screens to prevent layout break) */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              color: 'rgba(255,255,255,0.04)',
              position: 'absolute',
              bottom: -20,
              left: 40,
              fontSize: { xs: '4rem', sm: '8rem', md: '12rem' },
              lineHeight: 1,
              userSelect: 'none',
              textTransform: 'uppercase',
              letterSpacing: { xs: -2, md: -8 },
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Management
          </Typography>

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" sx={{
              fontWeight: 800,
              color: "white",
              mb: 1,
              letterSpacing: '-0.03em',
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
            }}>
              Admin <Chip label="v3.0" size="small" sx={{ height: 20, color: 'white', fontWeight: 700, bgcolor: 'rgba(255,255,255,0.15)' }} />
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", maxWidth: 500, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
              Welcome back. Monitor campus performance and departmental operations.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* --- CONTENT SECTION --- */}
      <Container maxWidth="xl" sx={{ mt: { xs: -5, md: -8 }, position: 'relative', zIndex: 2 }}>

        {/* Responsive Quick Stats Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 4, md: 6 } }}>
          {[{ l: 'Students', v: '1,240' }, { l: 'Attendance', v: '92%' }, { l: 'Alerts', v: '3' }].map((stat, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Box sx={{
                p: { xs: 2, md: 3.5 },
                bgcolor: 'white',
                borderRadius: { xs: 4, md: 6 },
                border: '1px solid #eef2f6',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.04)',
                textAlign: 'center'
              }}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, fontSize: { xs: '0.65rem', md: '0.75rem' } }}>{stat.l}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>{stat.v}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ mb: 3.5, fontWeight: 800, color: "#1e293b", display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
          <Box sx={{ width: 6, height: 20, bgcolor: '#0d9488', borderRadius: 1 }} />
          Departmental Modules
        </Typography>

        {/* Responsive Module Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                style={{ height: '100%' }}
              >
                <Card
                  onClick={() => navigate(item.path)}
                  sx={{
                    height: '100%',
                    bgcolor: "white",
                    cursor: "pointer",
                    borderRadius: { xs: 5, md: 7 },
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: item.color,
                      boxShadow: `0 20px 40px -15px ${alpha(item.color, 0.15)}`,
                    },
                  }}
                >
                  <Box sx={{ p: { xs: 3, md: 4.5 } }}>
                    <Box sx={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 }, borderRadius: 3,
                      bgcolor: alpha(item.color, 0.08), color: item.color, mb: { xs: 2, md: 3.5 },
                      boxShadow: `inset 0 0 0 1px ${alpha(item.color, 0.1)}`
                    }}>
                      {React.cloneElement(item.icon, { sx: { fontSize: { xs: 24, md: 32 } } })}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a", mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", mb: 3, minHeight: { xs: 'auto', md: '40px' }, lineHeight: 1.5, fontSize: { xs: '0.85rem', md: '0.875rem' } }}>
                      {item.subtitle}
                    </Typography>

                    <Box sx={{
                      display: 'flex', alignItems: 'center',
                      color: item.color, fontWeight: 900, fontSize: '0.75rem',
                      textTransform: 'uppercase', letterSpacing: 1
                    }}>
                      Manage View <EastRoundedIcon sx={{ ml: 1, fontSize: 16 }} />
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}