import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import userService from '../../services/userService';
import taskService from '../../services/taskService';

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get all users
        const users = await userService.getAllUsers();
        setUserCount(users.length);

        // Get all tasks
        const tasks = await taskService.getAllTasks();
        setTaskCount(tasks.length);

        // Get 5 most recent tasks (based on creation date)
        const sortedTasks = [...tasks].sort((a, b) => 
          new Date(b.creationDateTime) - new Date(a.creationDateTime)
        );
        setRecentTasks(sortedTasks.slice(0, 5));
        
        setLoading(false);
      } catch (err) {
        setError('Error loading dashboard data');
        console.error('Dashboard error:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'success';
      case 2: return 'warning';
      case 3: return 'error';
      default: return 'default';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5">Loading dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h5" component="div">
                  {userCount} Users
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button 
                component={RouterLink} 
                to="/users" 
                size="small" 
                startIcon={<PersonIcon />}
              >
                View All Users
              </Button>
              <Button 
                component={RouterLink} 
                to="/users/new" 
                size="small" 
                startIcon={<AddIcon />}
              >
                Add User
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <AssignmentIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h5" component="div">
                  {taskCount} Tasks
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button 
                component={RouterLink} 
                to="/tasks" 
                size="small" 
                startIcon={<AssignmentIcon />}
              >
                View All Tasks
              </Button>
              <Button 
                component={RouterLink} 
                to="/tasks/new" 
                size="small" 
                startIcon={<AddIcon />}
              >
                Add Task
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      
      {/* Recent Tasks */}
      <Paper sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Tasks
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {recentTasks.length > 0 ? (
          <List>
            {recentTasks.map((task) => (
              <React.Fragment key={task.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">
                          {task.title}
                        </Typography>
                        <Chip 
                          label={getPriorityText(task.priority)} 
                          color={getPriorityColor(task.priority)} 
                          size="small" 
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Status: {task.status}
                        </Typography>
                        {task.assignee && (
                          <Typography component="span" variant="body2" display="block">
                            Assigned to: {task.assignee.firstName} {task.assignee.lastName}
                          </Typography>
                        )}
                      </>
                    }
                  />
                  <Button 
                    component={RouterLink} 
                    to={`/tasks/edit/${task.id}`} 
                    size="small" 
                    variant="outlined"
                  >
                    View
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body1">No tasks found</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Dashboard;
