import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Alert,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { Edit, Delete, Search, Clear, ArrowBack } from '@mui/icons-material';
import { taskService } from '../../services/taskService';

const TaskSearch = () => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    loadAllTasks();
  }, []);

  const loadAllTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      setAllTasks(data);
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByTag = async () => {
    if (!searchTag.trim()) {
      setTasks(allTasks);
      setSearchResults(null);
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const data = await taskService.getTasksByTag(searchTag.trim());
      setTasks(data);
      setSearchResults({
        tag: searchTag.trim(),
        count: data.length
      });
    } catch (err) {
      setError('Failed to search tasks by tag');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTag('');
    setTasks(allTasks);
    setSearchResults(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        setAllTasks(allTasks.filter(task => task.id !== id));
        if (searchResults) {
          setSearchResults({
            ...searchResults,
            count: updatedTasks.length
          });
        }
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'warning';
      case 'PENDING': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 3: return 'error';
      case 2: return 'warning';
      case 1: return 'success';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'Unknown';
    }
  };

  // Get unique tags from all tasks
  const getAllTags = () => {
    const tagSet = new Set();
    allTasks.forEach(task => {
      if (task.tags) {
        task.tags.split(',').forEach(tag => {
          tagSet.add(tag.trim());
        });
      }
    });
    return Array.from(tagSet).sort();
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          to="/tasks"
          sx={{ mb: 2 }}
        >
          Back to Tasks
        </Button>
        
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            borderBottom: '3px solid #ffbf00', 
            paddingBottom: 2, 
            fontWeight: 600,
            mb: 2
          }}
        >
          Search Tasks by Tag
        </Typography>
      </Box>

      {/* Search Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Search by tag"
                placeholder="Enter tag name..."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchByTag()}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Search />}
                  onClick={handleSearchByTag}
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={handleClearSearch}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
          
          {/* Available Tags */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Available tags:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {getAllTags().map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  clickable
                  onClick={() => {
                    setSearchTag(tag);
                    handleSearchByTag();
                  }}
                  sx={{ mb: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Search Results Info */}
      {searchResults && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Found {searchResults.count} task{searchResults.count !== 1 ? 's' : ''} with tag "{searchResults.tag}"
        </Alert>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Results Table */}
      {tasks.length === 0 && searchResults ? (
        <Alert severity="warning">
          No tasks found with the tag "{searchResults.tag}".
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <Chip 
                      label={task.status} 
                      color={getStatusColor(task.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={getPriorityLabel(task.priority)} 
                      color={getPriorityColor(task.priority)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {task.tags ? (
                      task.tags.split(',').map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag.trim()}
                          size="small"
                          clickable
                          onClick={() => {
                            setSearchTag(tag.trim());
                            handleSearchByTag();
                          }}
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{task.assignee?.name || 'Unassigned'}</TableCell>
                  <TableCell>{new Date(task.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      to={`/tasks/edit/${task.id}`}
                      color="secondary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(task.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default TaskSearch;