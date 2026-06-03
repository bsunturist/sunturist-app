import LoginPage from "./pages/LoginPage"
import ToursPage from "./pages/ToursPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RemindersPage from "./pages/RemindersPage";
import AccommodationsPage from "./pages/AccommodationsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import IzletiPage from "./pages/IzletiPage";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage/>}/>

        <Route path="/tours" element={
          <ProtectedRoute>
            <ToursPage/>
          </ProtectedRoute>
          }
          />

        <Route path="/reminders" element={
          <ProtectedRoute>
            <RemindersPage/>
          </ProtectedRoute>
        }/>

         <Route
                    path="/"
                    element={<Navigate to="/tours" replace />}
                />

        <Route
            path="/accommodations"
            element={
                <ProtectedRoute>
                    <AccommodationsPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/activities"
            element={
                <ProtectedRoute>
                    <ActivitiesPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/izleti"
            element={
              <ProtectedRoute>
                <IzletiPage />
              </ProtectedRoute>
              
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App
