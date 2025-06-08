import { Container, Typography } from '@mui/material';
import PokemonList from './components/client/PokemonList';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
        fontWeight: 'bold', 
        mb: 4,
        color: 'primary.main',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Pokédex
      </Typography>
      <PokemonList />
    </Container>
  );
}