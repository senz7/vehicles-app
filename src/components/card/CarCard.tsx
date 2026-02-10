import React from "react";
import { Car } from "../../types/car";

interface Props {
  car: Car;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const CarCard: React.FC<Props> = ({ car, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{car.name}</h3>
        <p className="text-gray-700">{car.model}</p>
        <p className="text-gray-500">{car.year}</p>
        <p className="font-medium mt-2">${car.price.toLocaleString()}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 border border-black px-2 py-1 hover:bg-black hover:text-white transition"
          onClick={() => onEdit(car.id)}
        >
          Редактировать
        </button>
        <button
          className="flex-1 border border-red-500 text-red-500 px-2 py-1 hover:bg-red-500 hover:text-white transition"
          onClick={() => onDelete(car.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CarCard;
