import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/pages/Dashboard';
import UserList from './components/pages/UserList';
import UserForm from './components/pages/UserForm';
import TaskList from './components/pages/TaskList';
import TaskForm from './components/pages/TaskForm';
import TasksByUser from './components/pages/TasksByUser';
import NotFound from './components/pages/NotFound';

const theme = createTheme({
  palette: {
    primary: {
      main: '#49453f', // Grafite
      light: '#bdbbb3', // Cinza claro
      dark: '#000000', // Preto
    },
    secondary: {
      main: '#ffbf00', // Amarelo (usado com moderação)
      light: '#fff3cd',
      dark: '#cc9900',
    },
    background: {
      default: '#ffffff', // Branco
      paper: '#bdbbb3', // Cinza claro para cards
    },
    text: {
      primary: '#000000', // Preto para texto principal
      secondary: '#49453f', // Grafite para texto secundário
    },
    grey: {
      100: '#ffffff',
      200: '#bdbbb3',
      300: '#49453f',
      900: '#000000',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      color: '#000000',
      fontWeight: 600,
    },
    h2: {
      color: '#000000',
      fontWeight: 600,
    },
    h3: {
      color: '#000000',
      fontWeight: 600,
    },
    h4: {
      color: '#000000',
      fontWeight: 600,
    },
    h5: {
      color: '#000000',
      fontWeight: 600,
    },
    h6: {
      color: '#000000',
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          border: '1px solid #000000',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000 !important',
          color: '#ffffff !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#49453f',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#000000',
          },
        },
        outlined: {
          borderColor: '#49453f',
          color: '#49453f',
          '&:hover': {
            borderColor: '#000000',
            backgroundColor: 'rgba(73, 69, 63, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #000000',
          borderRadius: '0px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          '& .MuiTableCell-head': {
            color: '#ffffff',
            fontWeight: 600,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorWarning: {
          backgroundColor: '#ffbf00',
          color: '#000000',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main className="container" style={{ flex: 1, paddingBottom: '2rem' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/new" element={<UserForm />} />
              <Route path="/users/edit/:id" element={<UserForm />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/new" element={<TaskForm />} />
              <Route path="/tasks/edit/:id" element={<TaskForm />} />
              <Route path="/tasks/by-user" element={<TasksByUser />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
