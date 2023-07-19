import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Dragd from 'react-dragd';
import Establishment from '../types/IEstablishment';

export default function ReadEstablishmentPage() {
  const { id } = useParams();
  const [establishment, setEstablishment] = useState<Establishment>();
  let scheme = null;

  useEffect(() => {
    fetch(`http://localhost:5000/api/establishment/${id}`)
      .then((response) => response.json())
      .then((data) => setEstablishment(data.establishment))
      .catch((error) => console.error('Произошла ошибка:', error));
  }, [id]);

  if (establishment?.painting_data === null) {
    scheme = <p>Нет схемы</p>;
  } else if (establishment?.painting_data === undefined) {
    scheme = <p>Загрузка данных...</p>;
  } else {
    scheme = <Dragd immutable initialState={establishment.painting_data} />;
  }

  return (
    <div>
      <h1>
        Заведение <i>{establishment?.establishment_name}</i>
      </h1>
      {scheme}
    </div>
  );
}
