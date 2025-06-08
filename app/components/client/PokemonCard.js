'use client';

import { Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';

export default function PokemonCard({ pokemon }) {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: '12px',
      boxShadow: 3,
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.03)',
      }
    }}>
      <CardMedia
        component="img"
        image={pokemon.image}
        alt={pokemon.name}
        sx={{ 
          height: 200, 
          objectFit: 'contain',
          pt: 2,
          backgroundColor: '#f5f5f5'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ textTransform: 'capitalize' }}>
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          #{pokemon.id.toString().padStart(3, '0')}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {pokemon.types.map(type => (
            <Chip 
              key={type} 
              label={type} 
              size="small" 
              sx={{ 
                textTransform: 'capitalize',
                backgroundColor: getTypeColor(type),
                color: 'white'
              }} 
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

// Función auxiliar para colores según tipo de Pokémon
function getTypeColor(type) {
  const colors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return colors[type] || '#777';
}