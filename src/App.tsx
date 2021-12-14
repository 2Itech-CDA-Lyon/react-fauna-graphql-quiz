import { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { AllQuizzesPage } from './pages';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', Arial, sans-serif;
    background-color: #f0f0f0;
  }
`;

const App: FC = () => {
  return (
    <>
      <GlobalStyle />
      <AllQuizzesPage />
    </>
  )
}
    
export default App;
    