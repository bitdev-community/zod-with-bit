import { Container, Typography } from '@mui/material';
import LetsTalkForm from './lets-talk-form';

function App() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Let's Talk
      </Typography>
      <LetsTalkForm />
    </Container>
  );
}

export default App;
