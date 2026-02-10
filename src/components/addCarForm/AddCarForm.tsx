import React, { useState } from "react";
import { Car } from "../../types/car";

interface Props {
  onAdd: (car: Car) => void;
}

const AddCarForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !model || !year || !price || !color) return;

    const newCar: Car = {
      id: Date.now(),
      name,
      model,
      year: parseInt(year),
      price: parseFloat(price),
      color,
      latitude: 0,
      longitude: 0,
    };

    onAdd(newCar);

    setName("");
    setModel("");
    setYear("");
    setPrice("");
    setColor("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded-lg bg-white mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <input
        className="border p-2 rounded"
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        placeholder="Модель"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        type="number"
        placeholder="Год"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        placeholder="Цвет"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button
        type="submit"
        className="col-span-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
      >
        Добавить машину
      </button>
    </form>
  );
};

export default AddCarForm;
