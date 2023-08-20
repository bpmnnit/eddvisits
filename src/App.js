import SignupForm from './components/user/SignupForm';
import Visit from './components/visitor/Visit';
import TestComponent from './components/testcomponent/TestComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import history from './history';

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <div>
          <Routes>
            <Route path="/" element={<TestComponent />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/visit" element={<Visit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
