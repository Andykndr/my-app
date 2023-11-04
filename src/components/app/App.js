import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import { Suspense, lazy, useState } from 'react';
import Spinner from '../spinner/Spinner';
import Login from '../pages/Login';

import { AuthContext } from '../context/AuthContext';
import CustomForm from '../pages/CustomForm';
import CharacterPage from '../pages/CharacterPage';
import SinglePage from '../pages/SinglePage';

const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
  const [isAuth, setIsAuth] = useState(AuthContext);
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <AuthContext.Provider
              value={{
                isAuth,
                setIsAuth,
              }}
            >
              {isAuth ? (
                <Routes>
                  <Route path="*" element={<ErrorPage />}></Route>
                  <Route path="/" element={<MainPage />}></Route>
                  <Route path="/form" element={<CustomForm />}></Route>
                  <Route
                    path="/comics/:id"
                    element={
                      <SinglePage
                        Component={SingleComicPage}
                        dataType="comic"
                      />
                    }
                  ></Route>
                  <Route
                    path="/characters/:id"
                    element={
                      <SinglePage
                        Component={CharacterPage}
                        dataType="character"
                      />
                    }
                  ></Route>

                  <Route path="comics" element={<ComicsPage />}></Route>
                </Routes>
              ) : (
                <Routes>
                  <Route path="*" element={<Login />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                </Routes>
              )}
            </AuthContext.Provider>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
