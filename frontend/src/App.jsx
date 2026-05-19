import LoginPage from "./pages/LoginPage"
import ToursPage from "./pages/ToursPage";
import ProtectedRoute from "./components/ProtectedRoute";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage/>}/>

        <Route path="/tours" element={
          <ProtectedRoute>
            <ToursPage/>
          </ProtectedRoute>
          }
          />

      </Routes>
    </BrowserRouter>
  );
}

export default App
