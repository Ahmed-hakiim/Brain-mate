import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Medicine from './Components/Medicine';
import Tasks from './Components/Tasks';
import Relatives from './Components/Relatives';
import AddMedicine from './Components/AddMedicine';
import AddRelatives from './Components/AddRelatives';
import { AuthContextProvider } from './Auth/auth-context';
import Profile from './Components/Profile';
import AddTask from './Components/AddTask';
import UpdateRelative from './Components/UpdateRelative';
import UpdateProfile from './Components/UpdateProfile';
import UpdateMedicine from './Components/UpdateMedicine';
import UpdateTask from './Components/UpdateTask';

function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthContextProvider>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='home' element={<Home />} />
        <Route path='medicine' element={<Medicine />} />
        <Route path='tasks' element={<Tasks />} />
        <Route path='relatives' element={<Relatives />} />
        <Route path='addMedicine' element={<AddMedicine />} />
        <Route path='addRelative' element={<AddRelatives   />} />
        <Route path='addTask' element={<AddTask   />} />
        <Route path='relatives/:id' element={<UpdateRelative   />} />
        <Route path='profile' element={<Profile   />} />
        <Route path='profile/:id' element={<UpdateProfile   />} />
        <Route path='medicine/:id' element={<UpdateMedicine   />} />
        <Route path='tasks/:id' element={<UpdateTask   />} />
      </Routes>
      </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
