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
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          borderBottom: '3px solid #ffbf00', 
          paddingBottom: 2, 
          marginBottom: 4,
          fontWeight: 600 
        }}
      >
        Dashboard
      </Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, p: 3 }}>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <PersonIcon sx={{ fontSize: 48, mr: 2, color: '#ffbf00' }} />
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#000000' }}>
                  {userCount} Users
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0, justifyContent: 'space-between' }}>
              <Button 
                component={RouterLink} 
                to="/users" 
                startIcon={<PersonIcon />}
                sx={{ px: 2, py: 0.8, fontSize: '0.9rem' }}
              >
                View All Users
              </Button>
              <Button 
                component={RouterLink} 
                to="/users/new" 
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                sx={{ px: 2, py: 0.8, fontSize: '0.9rem', fontWeight: 600 }}
              >
                Add User
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, p: 3 }}>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <AssignmentIcon sx={{ fontSize: 48, mr: 2, color: '#ffbf00' }} />
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: '#000000' }}>
                  {taskCount} Tasks
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0, justifyContent: 'space-between' }}>
              <Button 
                component={RouterLink} 
                to="/tasks" 
                startIcon={<AssignmentIcon />}
                sx={{ px: 2, py: 0.8, fontSize: '0.9rem' }}
              >
                View All Tasks
              </Button>
              <Button 
                component={RouterLink} 
                to="/tasks/new" 
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                sx={{ px: 2, py: 0.8, fontSize: '0.9rem', fontWeight: 600 }}
              >
                Add Task
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      
      {/* Recent Tasks */}
      <Paper sx={{ mt: 4, p: 3, minHeight: '300px' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#000000', mb: 3 }}>
          Recent Tasks
        </Typography>
        <Divider sx={{ mb: 3, borderColor: '#ffbf00', borderWidth: 1 }} />
        
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
                    color="secondary"
                  >
                    View
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#49453f' }}>No tasks found</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Dashboard;
