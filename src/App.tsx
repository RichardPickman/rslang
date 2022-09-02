import { RouteNames } from "./router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Authorization";
import Textbook from "./pages/Textbook";
import Games from "./pages/Games/index";
import Statistics from "./pages/Statistics";
import AudiocallGame from "./pages/Games/AudiocallGame";
import NotFound from "./pages/NotFound/index";
import Unit from "./pages/Textbook/Unit";
import Signin from "./pages/Signup/index";
import DifficultWords from "./pages/Textbook/DifficultWords/index";
import TextbookLayout from "./pages/Textbook/TextbookLayout";
import UserDictionary from "./pages/Textbook/UserDictionary";
import SprintGame from './pages/Games/SprintGame/index';
import GamesNavigation from "./pages/Games/GamesNavigation/GamesNavigation";
import { GameMode, IUser } from "./types/types";
import LearnedWords from './pages/Textbook/LearnedWords/index';
import PrivateRoute from './router/PrivateRoute';
import LocalStorage from './services/localStorage';
import { useActions } from "./hooks/useActions";

export const App = () => {
  const { setAuthAction, setUserAction } = useActions();
  const user: IUser | null = LocalStorage.getItem('user');
  if (user) {
    setAuthAction(true);
    setUserAction(user);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteNames.HOMEPAGE} element={<Homepage />} />
        <Route path={RouteNames.AUTHORIZATION} element={<Login />} />
        <Route path={RouteNames.SIGNIN} element={<Signin />} />
        <Route path={RouteNames.TEXTBOOK} element={<TextbookLayout />}>
          <Route path={`${RouteNames.TEXTBOOK}`} element={<Textbook />}>
            <Route path={"units"}>
              <Route path={":id"} element={<Unit />}></Route>
            </Route>
          </Route>   
          <Route path={RouteNames.USER_DICTIONATY} element={<PrivateRoute><UserDictionary /></PrivateRoute>}>
            <Route index element={<p>Some content</p>} />
            <Route path={RouteNames.DIFFICULT_WORDS} element={<DifficultWords />} />
            <Route path={RouteNames.LEARNED_WORDS} element={<LearnedWords />} />
          </Route>
        </Route>

        <Route path={RouteNames.GAMES} element={<Games />}>
          <Route index element={<GamesNavigation state={GameMode.MENU_GAME}/>}/>
          <Route path={RouteNames.SPRINT_GAME} element={<SprintGame />}/>
          <Route path={RouteNames.AUDIOCALL_GAME} element={<AudiocallGame />} />
        </Route>

        <Route path={RouteNames.STATISTICS} element={<PrivateRoute><Statistics /></PrivateRoute>} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};
