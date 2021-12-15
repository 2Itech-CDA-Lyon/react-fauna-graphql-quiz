import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { AllQuizzesPage, PlayQuizPage } from './pages';

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllQuizzesPage />} />
          <Route path="/play/:quizId/:order" element={<PlayQuizPage />} />
          <Route path="*" element={<div>Page not found.</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
    
export default App;
    