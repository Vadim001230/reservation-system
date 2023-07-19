import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dragd from 'react-dragd';
import 'react-dragd/build/main.css';

export default function CreateEstablishmentPage() {
  const [establishmentName, setEstablishmentName] = useState('');
  const [paintingData, setPaintingData] = useState();
  const navigate = useNavigate();

  const handleCreate = () => {
    const requestBody = { establishment_name: establishmentName, painting_data: paintingData };

    fetch('http://localhost:5000/api/establishment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then(() => navigate('/'))
      .catch((error) => console.error('Произошла ошибка:', error));
  };
  function handleSave(items: any) {
    setPaintingData(items);
  }

  return (
    <div>
      <h1>Создание нового заведения</h1>
      <input
        type="text"
        value={establishmentName}
        onChange={(e) => setEstablishmentName(e.target.value)}
        placeholder="Имя заведения"
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleCreate} type="button">
        Сохранить
      </button>
      <Dragd saveCallback={handleSave} />
    </div>
  );
}
