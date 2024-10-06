import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import DetailedArticlePage from './DetailedArticlePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/article/:id" element={<DetailedArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
