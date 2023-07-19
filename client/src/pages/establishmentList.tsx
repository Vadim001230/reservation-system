import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Establishment from '../types/IEstablishment';

export default function EstablishmentListPage() {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const navigate = useNavigate();

  const handleUpdate = (id: string) => {
    navigate(`/establishment/update/${id}`);
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:5000/api/establishment/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          setEstablishments((prevEstablishments) =>
            prevEstablishments.filter((establishment) => establishment.id !== id)
          );
        } else {
          throw new Error('Произошла ошибка при удалении заведения.');
        }
      })
      .catch((error) => console.error('Произошла ошибка:', error));
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/establishment')
      .then((response) => response.json())
      .then((data) => setEstablishments(data.establishments))
      .catch((error) => console.error('Произошла ошибка:', error));
  }, []);

  return (
    <div>
      <h1>Список заведений</h1>
      <Link to="/create">Создать новое заведение</Link>
      <ul>
        {establishments.map((establishment) => (
          <li key={establishment.id} style={{ marginTop: '10px' }}>
            <Link to={`/establishment/${establishment.id}`} style={{ marginRight: '20px' }}>
              {establishment.establishment_name}
            </Link>
            <button type="button" onClick={() => handleUpdate(establishment.id)} style={{ marginRight: '5px' }}>
              Изменить
            </button>
            <button onClick={() => handleDelete(establishment.id)} type="button">
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
