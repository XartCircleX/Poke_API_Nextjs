'use client';

import { useState } from 'react';
import { 
  TextField, 
  InputAdornment, 
  IconButton, 
  Box, 
  Button,
  Stack,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import NumbersIcon from '@mui/icons-material/Numbers';

export default function SearchBar({ 
  onNameSearch, 
  onIdSearch 
}) {
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [idSearchTerm, setIdSearchTerm] = useState('');

  const handleNameChange = (event) => {
    setNameSearchTerm(event.target.value);
  };

  const handleIdChange = (event) => {
    setIdSearchTerm(event.target.value);
  };

  const handleNameClear = () => {
    setNameSearchTerm('');
    onNameSearch('');
  };

  const handleIdClear = () => {
    setIdSearchTerm('');
    onIdSearch('');
  };

  const handleNameSearch = () => {
    onNameSearch(nameSearchTerm);
  };

  const handleIdSearch = () => {
    onIdSearch(idSearchTerm);
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Stack spacing={2}>
        {/* Búsqueda por nombre */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar Pokémon por nombre..."
            value={nameSearchTerm}
            onChange={handleNameChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: nameSearchTerm && (
                <IconButton onClick={handleNameClear} edge="end">
                  <ClearIcon />
                </IconButton>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                backgroundColor: 'background.paper',
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleNameSearch}
            sx={{ minWidth: '120px' }}
          >
            Buscar
          </Button>
        </Box>

        <Divider>o</Divider>

        {/* Búsqueda por número */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar Pokémon por número..."
            value={idSearchTerm}
            onChange={handleIdChange}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersIcon />
                </InputAdornment>
              ),
              endAdornment: idSearchTerm && (
                <IconButton onClick={handleIdClear} edge="end">
                  <ClearIcon />
                </IconButton>
              ),
              inputProps: {
                min: 1,
                max: 1025 // Número máximo actual de Pokémon
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                backgroundColor: 'background.paper',
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleIdSearch}
            sx={{ minWidth: '120px' }}
          >
            Buscar
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}