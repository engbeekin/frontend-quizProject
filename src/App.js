// // import Login from "./components/Login";
// // import LoginForm from "./components/LoginForm";
// // import Quiz from "./components/Quiz";
// // import Quiz2 from "./components/Quiz2";

// // function App() {
// //   return (
// //     <div className="App">
// //     <LoginForm/>
// //     {/* <Login/> */}
// //       {/* <Quiz/> */}

// //        {/* <Quiz2/> */}
// //     </div>
// //   );
// // }

// // export default App;
// // src/contexts/AuthContext.js

// // src/components/PrivateRoute.js

// // src/App.js
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import LoginForm from './components/LoginForm';
// import {PrivateRoute} from './components/PrivateRoute';
// import Quiz2 from './components/Quiz2';

// const App = () => {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<LoginForm />} />
//           <Route
//             path="/quiz"
//             element={
//               <PrivateRoute>
//                 <Quiz2 />
//               </PrivateRoute>
//             }
//           />
//           {/* Redirect all other routes to questions if logged in, otherwise to login */}
//           <Route
//             path="*"
//             element={
//               <PrivateRoute>
//                   <Quiz2 />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login"; // Adjust the path to your Login component
import Quiz2 from "./components/QuizForm";
import Quiz from "./pages/Quiz"; // Create this component
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/PrivateRoute";

const App = () => {
  
  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute requiresQuizId={true}>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
