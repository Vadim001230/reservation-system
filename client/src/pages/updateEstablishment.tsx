import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dragd from 'react-dragd';

export default function UpdateEstablishmentPage() {
  const { id } = useParams();
  const [establishmentName, setEstablishmentName] = useState('');
  const [paintingData, setPaintingData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/establishment/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEstablishmentName(data.establishment.establishment_name);
        setPaintingData(data.establishment.painting_data);
      })
      .catch((error) => console.error('Произошла ошибка:', error));
  }, [id]);

  function handleSave(items: any) {
    setPaintingData(items);
  }

  const handleCreate = () => {
    const requestBody = { establishment_name: establishmentName, painting_data: paintingData };
    fetch(`http://localhost:5000/api/establishment/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then(() => navigate('/'))
      .catch((error) => console.error('Произошла ошибка:', error));
  };

  return (
    <div>
      <h1>Изменить {establishmentName}</h1>
      <input
        type="text"
        value={establishmentName}
        onChange={(e) => setEstablishmentName(e.target.value)}
        placeholder="Имя заведения"
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleCreate} type="button">
        Сохранить изменения
      </button>
      {paintingData === undefined ? (
        <p>Загрузка данных...</p>
      ) : (
        <Dragd initialState={paintingData} saveCallback={handleSave} />
      )}
    </div>
  );
}
