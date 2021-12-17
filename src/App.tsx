import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { CurrentGameContextProvider } from './contexts/current-game';
import { AllQuizzesPage, PlayQuizPage, PlayResultPage, PlaySwitch } from './pages';

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
      <CurrentGameContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllQuizzesPage />} />
            <Route path="/play" element={<PlaySwitch />} />
            <Route path="/play/:quizId/:order" element={<PlayQuizPage />} />
            <Route path="/play/result/:scoreId" element={<PlayResultPage />} />
            <Route path="*" element={<div>Page not found.</div>} />
          </Routes>
        </BrowserRouter>
      </CurrentGameContextProvider>
    </>
  )
}
    
export default App;
    