import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    url: "/analysis",
    name: "Dynamic Data Analysis",
    description:
      "Implemented dynamic data analysis using Power BI, Python, and LangChain, with web scraping via Beautiful Soup for real-time data extraction.",
    tags: ["Power BI", "Python", "LangChain", "Beautiful Soup", "Data Analysis"],
  },
  {
    id: 2,
    name: "Medical Chatbot",
    url: "/chatbot",
    description:
      "Developed an intelligent medical chatbot using React, Django, and MongoDB to provide real-time responses to user queries.",
    tags: ["React", "Django", "MongoDB", "API Integration", "Healthcare"],
  },
  {
    id: 3,
    name: "Dynamic Website Creation",
    url: "/llm",
    description:
      "Built a responsive dynamic website with React, Node.js, and MongoDB, featuring interactive user interfaces and real-time data updates.",
    tags: ["React", "Node.js", "MongoDB", "Responsive Design", "UX/UI"],
  },
];

const Projects = () => {
  const navigate = useNavigate();

  const handleProjectClick = (url) => {
    navigate(`${url}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa", py: 8, px: { xs: 2, md: 10 } }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: "purple" }}>
        My Projects
      </Typography>

      <Grid container spacing={4} mt={4}>
        {projects.map((project) => (
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 4,
                border: "1px solid #e0e0e0",
                boxShadow: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                  cursor: "pointer",
                },
              }}
              onClick={() => handleProjectClick(project.url)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>

                <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                  {project.tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: "#f3e8ff",
                        color: "#7e22ce",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: "center", borderTop: "1px solid #e0e0e0" }}>
                <Button
                  variant="text"
                  endIcon={<ArrowRight size={18} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/project/${project.id}`);
                  }}
                  sx={{
                    color: "purple",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                      background: "transparent",
                    },
                  }}
                >
                  View Project
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
