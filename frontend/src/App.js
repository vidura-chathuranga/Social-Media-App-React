import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homepage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/profile/:userId" element={<ProfilePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
