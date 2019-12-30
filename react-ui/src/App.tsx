import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { CustomiseProvider } from './CustomiseContext';
import StyledCustomiseScreen from './Containers/CustomiseScreen';
  
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CustomiseProvider>
        <StyledCustomiseScreen></StyledCustomiseScreen>
      </CustomiseProvider>
    </ThemeProvider>
  );
}

export default App;
