import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, isValid, parseISO, subYears } from 'date-fns';
import userService from '../../services/userService';

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    birthDate: null
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    if (isEditMode) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await userService.getUserById(id);
      // Convert ISO string to Date object for the DatePicker
      const birthDate = data.birthDate ? parseISO(data.birthDate) : null;
      setUser({ ...data, birthDate });
      setLoading(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error loading user',
        severity: 'error'
      });
      console.error('Error fetching user:', err);
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!user.firstName || user.firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
    } else if (user.firstName.length > 30) {
      newErrors.firstName = 'First name must be less than 30 characters';
    }
    
    if (!user.lastName || user.lastName.trim() === '') {
      newErrors.lastName = 'Last name is required';
    } else if (user.lastName.length > 100) {
      newErrors.lastName = 'Last name must be less than 100 characters';
    }
    
    if (!user.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      // Check if user is at least 18 years old
      const minDate = subYears(new Date(), 18);
      if (user.birthDate > minDate) {
        newErrors.birthDate = 'User must be at least 18 years old';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleDateChange = (date) => {
    setUser({ ...user, birthDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSaving(true);
      
      // Format date for API
      const formattedUser = {
        ...user,
        birthDate: isValid(user.birthDate) ? format(user.birthDate, 'yyyy-MM-dd') : null
      };
      
      if (isEditMode) {
        await userService.updateUser(id, formattedUser);
        setSnackbar({
          open: true,
          message: 'User updated successfully',
          severity: 'success'
        });
      } else {
        await userService.createUser(formattedUser);
        setSnackbar({
          open: true,
          message: 'User created successfully',
          severity: 'success'
        });
      }
      
      // Redirect after a short delay to show the success message
      setTimeout(() => {
        navigate('/users');
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.error || (isEditMode ? 'Error updating user' : 'Error creating user');
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
      console.error('Error saving user:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEditMode ? 'Edit User' : 'Create User'}
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                required
                value={user.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                disabled={saving}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                required
                value={user.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                disabled={saving}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Birth Date"
                value={user.birthDate}
                onChange={handleDateChange}
                disabled={saving}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!errors.birthDate,
                    helperText: errors.birthDate
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserForm;
