import ReactDOM from "react-dom/client";
import { RouteNames } from './router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Textbook from './pages/Textbook';
import Games from './pages/Games';
import Statistics from './pages/Statistics';
import NotFound from './pages/NotFound/index';
import Unit from "./pages/Textbook/Unit";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteNames.HOMEPAGE} element={<Homepage />} />
        <Route path={RouteNames.LOGIN} element={<Login />} />
        <Route path={RouteNames.TEXTBOOK} element={<Textbook />}>
          <Route path={'units'}>
            <Route path={':id'} element={<Unit />}></Route>
          </Route>
          <Route index element={<div>Some content</div>}></Route>
        </Route>
        <Route path={RouteNames.GAMES} element={<Games />} />
        <Route path={RouteNames.STATISTICS} element={<Statistics />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
