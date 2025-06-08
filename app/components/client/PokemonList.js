'use client';

import { useState, useEffect } from 'react';
import { 
  Grid, 
  CircularProgress, 
  Container, 
  Typography,
  Alert
} from '@mui/material';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para buscar por nombre
  const handleNameSearch = async (name) => {
    if (!name) {
      setFilteredPokemon(pokemonList);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Buscar en la lista existente primero
      const localResults = pokemonList.filter(p => 
        p.name.toLowerCase().includes(name.toLowerCase())
      );
      
      if (localResults.length > 0) {
        setFilteredPokemon(localResults);
      } else {
        // Si no encuentra localmente, buscar en la API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        
        const data = await response.json();
        const pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.other['official-artwork'].front_default || 
                data.sprites.front_default,
          types: data.types.map(type => type.type.name),
        };
        
        setFilteredPokemon([pokemon]);
      }
    } catch (err) {
      setError(err.message);
      setFilteredPokemon([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar por ID
  const handleIdSearch = async (id) => {
    if (!id) {
      setFilteredPokemon(pokemonList);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Buscar en la lista existente primero
      const localResult = pokemonList.find(p => p.id === Number(id));
      
      if (localResult) {
        setFilteredPokemon([localResult]);
      } else {
        // Si no encuentra localmente, buscar en la API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        
        const data = await response.json();
        const pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.other['official-artwork'].front_default || 
                data.sprites.front_default,
          types: data.types.map(type => type.type.name),
        };
        
        setFilteredPokemon([pokemon]);
      }
    } catch (err) {
      setError(err.message);
      setFilteredPokemon([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar lista inicial de Pokémon
  useEffect(() => {
    const fetchInitialPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const data = await response.json();
        
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const detail = await res.json();
            return {
              id: detail.id,
              name: detail.name,
              image: detail.sprites.other['official-artwork'].front_default || 
                    detail.sprites.front_default,
              types: detail.types.map(type => type.type.name),
            };
          })
        );
        
        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData);
      } catch (err) {
        setError('Error al cargar los Pokémon');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPokemon();
  }, []);

  return (
    <>
      <SearchBar 
        onNameSearch={handleNameSearch} 
        onIdSearch={handleIdSearch} 
      />
      
      {loading && (
        <Container sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Container>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {!loading && filteredPokemon.length === 0 && !error && (
        <Typography align="center" sx={{ my: 4 }}>
          No se encontraron Pokémon. ¡Prueba con otro nombre o número!
        </Typography>
      )}
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {filteredPokemon.map(pokemon => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}