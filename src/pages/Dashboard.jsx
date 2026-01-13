import { Typography, Grid, Card, Box, Container, alpha, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// Icons
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import InsightsTwoToneIcon from '@mui/icons-material/InsightsTwoTone';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.96 },
  visible: { y: 0, opacity: 1, scale: 1 },
  hover: { 
    y: -12, 
    scale: 1.04,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

const iconVariants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, delay: 0.3 }
  }
};

export default function Dashboard() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Attendance",
      subtitle: "Track daily presence",
      icon: <PeopleAltTwoToneIcon />,
      path: "/attendance",
      color: "#3B82F6",
      gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"
    },
    {
      title: "Results",
      subtitle: "Manage student grades",
      icon: <AssessmentTwoToneIcon />,
      path: "/results",
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)"
    },
    {
      title: "Notices",
      subtitle: "Campus announcements",
      icon: <CampaignTwoToneIcon />,
      path: "/notices",
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
    },
    {
      title: "Reports",
      subtitle: "Deep data insights",
      icon: <InsightsTwoToneIcon />,
      path: "/reports",
      color: "#10B981",
      gradient: "linear-gradient(135deg, #34d399 0%, #10b981 100%)"
    },
  ];

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "#f8fafc",
      backgroundImage: "radial-gradient(circle at 25% 25%, rgba(59,130,246,0.07) 0%, transparent 20%)"
    }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              fontWeight: 800, 
              color: "#0f172a",
              letterSpacing: "-0.5px",
              mb: 1
            }}
          >
            Dashboard Overview
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: "#64748b", 
              maxWidth: 560,
              mb: 5,
              fontSize: '1.1rem'
            }}
          >
            Quick access to all major administrative functions of your institution
          </Typography>

          <Divider sx={{ mb: 6, borderColor: alpha("#64748b", 0.12) }} />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(item.path)}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      minHeight: 220,
                      p: 3.5,
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: alpha(item.color, 0.18),
                      background: "white",
                      backdropFilter: "blur(8px)",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        borderColor: item.color,
                        background: "rgba(255,255,255,0.98)",
                        boxShadow: `0 20px 35px ${alpha(item.color, 0.18)}, 0 8px 15px ${alpha(item.color, 0.08)}`,
                      },
                    }}
                  >
                    {/* Color accent bar */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: item.gradient,
                        opacity: 0.9,
                      }}
                    />

                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <motion.div variants={iconVariants}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 3,
                            background: alpha(item.color, 0.12),
                            color: item.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 3,
                            boxShadow: `0 4px 12px ${alpha(item.color, 0.2)}`,
                          }}
                        >
                          {item.icon}
                        </Box>
                      </motion.div>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#1e293b",
                          mb: 0.5,
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          fontWeight: 500,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.subtitle}
                      </Typography>

                      <Box
                        sx={{
                          mt: 3,
                          color: alpha(item.color, 0.7),
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: 1,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                      >
                        Go <ArrowForwardRoundedIcon fontSize="small" />
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}