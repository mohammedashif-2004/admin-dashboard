import React, { useState } from "react";
import {
  Box, Typography, Container, Avatar, Grid, Card, Button, Chip, 
  Divider, Stack, TextField, IconButton, Paper
} from "@mui/material";
import { motion } from "framer-motion";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function ProfessionalTeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    role: "Senior Faculty Member",
    dept: "Department of Computer Science & Engineering",
    about: "I am a dedicated educator with over a decade of experience in fostering technical excellence. My teaching approach focuses on 'Learning by Doing,' where I integrate real-world industry projects with core theoretical concepts. I am passionate about mentoring students to bridge the gap between academic learning and professional software engineering standards.",
    qualifications: "Ph.D. in Computer Science - Stanford (2018)\nM.Tech in Software Systems - IIT Delhi (2012)",
    experience: "8+ Years Academic Teaching\n3 Years Senior Software Engineer at Google",
    skills: ["Java", "React.js", "Mentoring", "System Design", "Cloud Computing"]
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const primaryTeal = "#0d9488";

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pb: 10 }}>
      {/* COVER BACKGROUND */}
      <Box sx={{ height: 220, background: `linear-gradient(135deg, ${primaryTeal}, #134e4a)` }} />

      <Container maxWidth="lg" sx={{ mt: -10 }}>
        {/* HEADER CARD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card sx={{ p: 4, borderRadius: 6, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={3} textAlign="center">
                <Avatar sx={{ width: 140, height: 140, margin: "auto", bgcolor: primaryTeal, fontSize: "3rem", fontWeight: 700, border: "6px solid white", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
                  {profile.name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid item xs={12} md={6}>
                {isEditing ? (
                  <Stack spacing={2}>
                    <TextField fullWidth name="name" label="Full Name" value={profile.name} onChange={handleChange} />
                    <TextField fullWidth name="role" label="Current Role" value={profile.role} onChange={handleChange} />
                  </Stack>
                ) : (
                  <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
                    <Typography variant="h3" fontWeight={800} color="#1e293b">{profile.name}</Typography>
                    <Chip label={profile.role} sx={{ bgcolor: primaryTeal, color: "white", fontWeight: 700 }} />
                    <Typography color="text.secondary" variant="h6">{profile.dept}</Typography>
                  </Stack>
                )}
              </Grid>
              <Grid item xs={12} md={3} textAlign="center">
                <Button
                  variant="contained"
                  startIcon={isEditing ? <SaveRoundedIcon /> : <EditRoundedIcon />}
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{ 
                    bgcolor: isEditing ? "#10b981" : primaryTeal, 
                    px: 4, py: 1.5, 
                    borderRadius: 3, 
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { bgcolor: isEditing ? "#059669" : "#0f766e" }
                  }}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </motion.div>

        {/* CONTENT SECTION */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          
          {/* LEFT COLUMN: ABOUT SECTION */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 5, height: '100%' }}>
              <Typography variant="h6" fontWeight={800} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                About My Teaching
              </Typography>
              <Divider sx={{ mb: 3 }} />
              {isEditing ? (
                <TextField 
                  fullWidth 
                  multiline 
                  rows={10} 
                  name="about" 
                  value={profile.about} 
                  onChange={handleChange}
                  variant="outlined"
                />
              ) : (
                <Typography sx={{ color: "#475569", lineHeight: 1.8, fontSize: '1.05rem' }}>
                  {profile.about}
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* RIGHT COLUMN: CREDENTIALS */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              
              {/* Qualifications */}
              <Paper sx={{ p: 3, borderRadius: 5 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <SchoolRoundedIcon sx={{ color: primaryTeal }} />
                  <Typography variant="h6" fontWeight={700}>Qualifications</Typography>
                </Stack>
                {isEditing ? (
                  <TextField fullWidth multiline name="qualifications" value={profile.qualifications} onChange={handleChange} variant="standard" />
                ) : (
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line", color: "#475569", fontWeight: 500 }}>
                    {profile.qualifications}
                  </Typography>
                )}
              </Paper>

              {/* Experience */}
              <Paper sx={{ p: 3, borderRadius: 5 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <BadgeRoundedIcon sx={{ color: primaryTeal }} />
                  <Typography variant="h6" fontWeight={700}>Experience</Typography>
                </Stack>
                {isEditing ? (
                  <TextField fullWidth multiline name="experience" value={profile.experience} onChange={handleChange} variant="standard" />
                ) : (
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line", color: "#475569", fontWeight: 500 }}>
                    {profile.experience}
                  </Typography>
                )}
              </Paper>

              {/* Key Skills */}
              <Paper sx={{ p: 3, borderRadius: 5 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <MenuBookRoundedIcon sx={{ color: primaryTeal }} />
                  <Typography variant="h6" fontWeight={700}>Key Skills</Typography>
                </Stack>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {profile.skills.map((skill, index) => (
                    <Chip 
                      key={index} 
                      label={skill} 
                      variant="outlined" 
                      onDelete={isEditing ? () => {
                        const newSkills = profile.skills.filter((_, i) => i !== index);
                        setProfile({ ...profile, skills: newSkills });
                      } : undefined}
                      sx={{ borderRadius: 1.5, fontWeight: 500 }}
                    />
                  ))}
                  {isEditing && (
                    <IconButton size="small" onClick={() => {
                      const newSkill = prompt("Add a new skill:");
                      if(newSkill) setProfile({...profile, skills: [...profile.skills, newSkill]});
                    }}>
                      <AddCircleOutlineIcon sx={{ color: primaryTeal }} />
                    </IconButton>
                  )}
                </Box>
              </Paper>

            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}