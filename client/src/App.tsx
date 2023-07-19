import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEstablishmentPage from './pages/createEstablishment';
import EstablishmentListPage from './pages/establishmentList';
import EstablishmentReadModePage from './pages/readEstablishment';
import UpdateEstablishmentPage from './pages/updateEstablishment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EstablishmentListPage />} />
        <Route path="/create" element={<CreateEstablishmentPage />} />
        <Route path="/establishment/:id" element={<EstablishmentReadModePage />} />
        <Route path="/establishment/update/:id" element={<UpdateEstablishmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
