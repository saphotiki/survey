import React from 'react';
import FormPage from './pages/formPage';
import SurveyResultsPage from './pages/surveyResultsPage';
import { BrowserRouter, Routes, Route , createBrowserRouter ,createRoutesFromElements , RouterProvider } from "react-router-dom";
import Layout from './pages/layout';
import { loader as surveyloader } from './components/surveyResults';

function App() {

  const RoutesJSX = (
        <Route path="/" element={<Layout />}>
          <Route index element={<FormPage />} />
          <Route path="result" loader={surveyloader} element={<SurveyResultsPage />} />
        </Route>
      );

      const routes = createRoutesFromElements(RoutesJSX);

      const router = createBrowserRouter(routes);

      return (<RouterProvider router={router} />);
}

export default App;
