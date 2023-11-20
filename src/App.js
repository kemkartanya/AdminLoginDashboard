import './App.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import NotFound from './page/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/error" element={<NotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
