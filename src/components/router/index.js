import ComicsPage from '../pages/ComicsPage';
import ErrorPage from '../pages/ErrorPage';
import Form from '../pages/Form';
import Login from '../pages/Login';
import MainPage from '../pages/MainPage';
import SingleComicPage from '../pages/SingleComicPage';

export const publicRoutes = [{ path: '/login', element: <Login /> }];

export const privatRoutes = [
  { path: '*', element: <ErrorPage /> },
  { path: '/', element: <MainPage /> },
  { path: '/comics/:id', element: <SingleComicPage /> },
  { path: '/comics', element: <ComicsPage /> },
  { path: '/form', element: <Form /> },
];
