import "./App.css";
import Header from "./components/header/header";
import CarList from "./components/carList/CarList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <CarList />
      </main>
    </div>
  );
};
export default App;
