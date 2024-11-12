import Button from '@mui/material/Button';
import { useState } from 'react';
import { Icon } from '@iconify/react';

function App() {
  const [status, setStatus] = useState(true)
  return (
    <>
      <p className="text-blue-400">hello World</p>
      <Button 
        variant="contained" 
        color='success' 
        sx={{
          backgroundColor: status ? 'green' : 'red',
          '&:hover': {
            backgroundColor: status ? 'darkgreen' : 'darkred',
          },
        }}
        className='bg-red-500'>Text <Icon icon="mdi-light:home" /></Button>
      
    </>
  )
}

export default App
