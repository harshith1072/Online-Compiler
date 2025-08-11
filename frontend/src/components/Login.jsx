import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api';  

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();

  const handleLoginSuccess = () => toast.success('Successfully logged in');
  const handleLoginError = () => toast.error('Invalid credentials, please try again.');
  const redirectToHomepage = () => navigate('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
 
    try {
        const response = await api.post('/login', { email, password });

        // ✅ Check for a successful status code instead of a token
        if (response.status === 200) {
            navigate('/problems');
            handleLoginSuccess();
        } else {
            handleLoginError();
        }
    } catch (error) {
        console.error(error);
        // ✅ Check for a 401 status to provide specific feedback
        if (error.response && error.response.status === 401) {
            handleLoginError();
        } else {
            toast.error('An unexpected error occurred. Please try again.');
        }
    }




finally {
  setIsLoading(false);
}

 

  };







  return (
    <div style={styles.page}>
      <div
        style={styles.backIcon}
        onClick={redirectToHomepage}
        title="Go Back"
      >
        <FiArrowLeft size={24} />
      </div>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Login to Your Account</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f0f4f8, #e1f5fe)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '2rem',
  },
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 30,
    cursor: 'pointer',
    color: '#555',
    transition: 'transform 0.2s ease',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '26px',
    fontWeight: '600',
    color: '#3f51b5',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#f9f9f9',
    outline: 'none',
    transition: 'border 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

export default Login;
 