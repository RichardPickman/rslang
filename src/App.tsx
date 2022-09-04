import ReactDOM from "react-dom/client";
import { RouteNames } from './router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Authorization';
import Textbook from './pages/Textbook';
import Games from './pages/Games';
import Statistics from './pages/Statistics';
import NotFound from './pages/NotFound/index';
import Unit from "./pages/Textbook/Unit";
import Signin from './pages/Signup/index';
import DifficultWords from './pages/Textbook/DifficultWords/index';
import TextbookLayout from "./pages/Textbook/TextbookLayout";
import SprintGame from './pages/Games/SprintGame/index';
import GamesNavigation from "./pages/Games/GamesNavigation";
import { ErrorsEnum, GameMode, IUser } from "./types/types";
import LearnedWords from './pages/Textbook/LearnedWords/index';
import PrivateRoute from './router/PrivateRoute';
import LocalStorage from './services/localStorage';
import { useActions } from "./hooks/useActions";
import TextbookNavigation from "./pages/Textbook/TextbookNavigation";
import { useEffect } from "react";
import UserService from './services/userService';
import { useAppSelector } from './hooks/useAppSelector';

export const App = () => {
  const { setAuthAction, setUserAction } = useActions();
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const userLS: IUser | null = LocalStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      if (userLS) {
        UserService.getUser({ userId: userLS.id, token: userLS.token })
          .then((response) => {
            setAuthAction(true);
            setUserAction(userLS);
          })
          .catch((error) => {
            if (error.message === ErrorsEnum.UNAUTHORIZED) {
              setAuthAction(false);
              LocalStorage.clear();
            }
          });
      } else {
        if (isAuth) {
          setAuthAction(false);
        }
      }

    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteNames.HOMEPAGE} element={<Homepage />} />
        <Route path={RouteNames.AUTHORIZATION} element={<Login />} />
        <Route path={RouteNames.SIGNIN} element={<Signin />} />
        <Route path={RouteNames.TEXTBOOK} element={<TextbookLayout />}>
          <Route index element={<TextbookNavigation />} />
          <Route path={`${RouteNames.TEXTBOOK}`} element={<Textbook />} >
            <Route path={'units'}>
              <Route path={':id'} element={<Unit />}></Route>
            </Route>
          </Route>
          <Route path={RouteNames.DIFFICULT_WORDS} element={<PrivateRoute><DifficultWords /></PrivateRoute>} />
          <Route path={RouteNames.LEARNED_WORDS} element={<PrivateRoute><LearnedWords /></PrivateRoute>} />
        </Route>

        <Route path={RouteNames.GAMES} element={<Games />}>
          <Route index element={<GamesNavigation state={GameMode.MENU_GAME} />} />
          <Route path={RouteNames.SPRINT_GAME} element={<SprintGame />} />
        </Route>
        <Route path={RouteNames.STATISTICS} element={<PrivateRoute><Statistics /></PrivateRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
