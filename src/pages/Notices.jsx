import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Container,
  Stack,
  IconButton,
  Tooltip,
  Alert,
  Divider,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Send,
  FileText,
  X,
  Info,
  Calendar,
  Trash2,
} from "lucide-react";

const mockNotices = [
  {
    id: 3,
    title: "Mid-Term Examination Schedule Released",
    message: "All students are requested to check the timetable on the portal.",
    date: "2026-01-10",
  },
  {
    id: 2,
    title: "Republic Day Celebration Details",
    message: "Cultural program will be held on 26th January from 8:00 AM.",
    date: "2026-01-05",
  },
  {
    id: 1,
    title: "Winter Vacation Notice",
    message: "College will remain closed from 25th Dec to 5th Jan.",
    date: "2025-12-20",
  },
];

export default function Notices() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [notices, setNotices] = useState(mockNotices);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handlePublish = () => {
    if (!title.trim() || !message.trim()) {
      setError("Both title and message are required!");
      return;
    }

    const newNotice = {
      id: Date.now(),
      title: title.trim(),
      message: message.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    setNotices((prev) => [newNotice, ...prev]);

    setSuccess(true);
    setError("");

    setTimeout(() => {
      setTitle("");
      setMessage("");
      setSuccess(false);
    }, 2800);
  };

  const handleClear = () => {
    setTitle("");
    setMessage("");
    setError("");
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = (id) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
    setDeleteConfirmId(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
      }}
    >
      <Navbar />

      <Container maxWidth="md" sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={5}
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  background: "linear-gradient(90deg, #1e293b 0%, #334155 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Notices
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Publish & manage college announcements
              </Typography>
            </Box>
          </Stack>

          {/* Publish Form */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              mb: 6,
            }}
          >
            <Stack spacing={4}>
              <TextField
                fullWidth
                label="Notice Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <FileText
                      size={18}
                      style={{ marginRight: 12, opacity: 0.7, marginTop: 4 }}
                    />
                  ),
                }}
                error={!!error && !title.trim()}
              />

              <TextField
                fullWidth
                label="Notice Message"
                multiline
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement here..."
                error={!!error && !message.trim()}
              />

              {success && (
                <Alert severity="success" variant="outlined">
                  Notice published successfully!
                </Alert>
              )}

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<X size={18} />}
                  onClick={handleClear}
                  disabled={!title && !message}
                >
                  Clear
                </Button>

                <Button
                  variant="contained"
                  startIcon={<Send size={18} />}
                  onClick={handlePublish}
                  disabled={!title.trim() || !message.trim() || success}
                >
                  Publish
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {/* Notices List */}
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Previous Notices
          </Typography>

          <Stack spacing={3}>
            {notices.length === 0 ? (
              <Alert severity="info" variant="outlined">
                No notices published yet.
              </Alert>
            ) : (
              notices.map((notice) => (
                <Paper
                  key={notice.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor:
                      deleteConfirmId === notice.id ? "error.main" : "divider",
                    bgcolor: "white",
                    transition: "all 0.2s",
                    position: "relative",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1}
                    mb={1.5}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {notice.title}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        icon={<Calendar size={16} />}
                        label={notice.date}
                        size="small"
                        variant="outlined"
                      />

                      {deleteConfirmId === notice.id ? (
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={() => handleConfirmDelete(notice.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={handleCancelDelete}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      ) : (
                        <Tooltip title="Delete notice">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteClick(notice.id)}
                            sx={{
                              "&:hover": { bgcolor: "error.lighter" },
                            }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </Stack>

                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ whiteSpace: "pre-wrap" }}
                  >
                    {notice.message}
                  </Typography>
                </Paper>
              ))
            )}
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}