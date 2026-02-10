import React, { useEffect, useState } from "react";
import { Car } from "../../types/car";
import { getVehicles } from "../../api/vehicles";
import CarCard from "../card/CarCard";
import AddCarForm from "../addCarForm/AddCarForm";
import CarMap from "../carMap/CarMap";

const LOCAL_STORAGE_KEY = "userCars";

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiCars = await getVehicles();
      const localCars: Car[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
      );
      setCars([...apiCars, ...localCars]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    const car = cars.find((c) => c.id === id);
    if (!car) return;

    const name = prompt("Новое имя:", car.name);
    const price = prompt("Новая цена:", car.price.toString());
    if (name && price) {
      const updatedCar = { ...car, name, price: parseFloat(price) };
      setCars((prev) => prev.map((c) => (c.id === id ? updatedCar : c)));

      // Обновляем только локальные машины
      if (id >= 1000000000000) {
        const localCars: Car[] = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
        );
        const newLocalCars = localCars.map((c) =>
          c.id === id ? updatedCar : c,
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocalCars));
      }
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить машину?")) {
      setCars((prev) => prev.filter((c) => c.id !== id));

      // Удаляем из localStorage если локальная
      if (id >= 1000000000000) {
        const localCars: Car[] = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
        );
        const newLocalCars = localCars.filter((c) => c.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocalCars));
      }
    }
  };

  const handleAdd = (car: Car) => {
    setCars((prev) => [...prev, car]);
    const localCars: Car[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...localCars, car]),
    );
  };

  const sortByPrice = () =>
    setCars((prev) => [...prev].sort((a, b) => a.price - b.price));
  const sortByYear = () =>
    setCars((prev) => [...prev].sort((a, b) => a.year - b.year));

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Загрузка...</p>;

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <CarMap cars={cars} />
      </div>
      <AddCarForm onAdd={handleAdd} />
      <div className="flex gap-4">
        <button onClick={sortByYear} className="px-4 py-2 border border-black">
          Сортировать по году
        </button>
        <button onClick={sortByPrice} className="px-4 py-2 border border-black">
          Сортировать по цене
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CarList;
