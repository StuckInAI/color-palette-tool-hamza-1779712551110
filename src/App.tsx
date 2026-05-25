import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import CarDetailPage from '@/pages/CarDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
