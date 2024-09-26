import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import './Css/home.css';

import AuthService from "./Service/auth.service";
import Login from "./components/login.component";
import Home from "./components/home.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/admin.component";
import HomeBackgroundSlider from "./components/homeBackgroundSlider";

import StudentRegister from "./components/RegistrationForm";
import StudentRegSuccess from "./components/StudentRegsuccess";
import StudentUpdate from "./components/studentUpdate";
import StudentCard from "./components/studentCard";
import ClassButtons from "./components/classButton";
import Updatesuccesspage from "./components/updatesuccesspage";
import Class1 from "./ClassComponents/class1";
import DeleteStudent from "./components/DeleteStudent";
import FindStudent from "./components/findStudent";
import AboutPage from "./components/about";
import Class2 from "./ClassComponents/class2";
import Class3 from "./ClassComponents/class3";
import Class4 from "./ClassComponents/class4";
import Class5 from "./ClassComponents/class5";
import Class6 from "./ClassComponents/class6";
import Class7 from "./ClassComponents/class7";
import Class8 from "./ClassComponents/class8";
import Class9 from "./ClassComponents/class9";
import Class10 from "./ClassComponents/class10";






class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      dropdownOpen: false, // New state to manage dropdown visibility
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showStudentBoard: user.roles?.includes("ROLE_STUDENT") || false,
        showAdminBoard: user.roles?.includes("ROLE_ADMIN") || true,
      });
    }
  }

  toggleDropdown() {
    this.setState((prevState) => ({ dropdownOpen: !prevState.dropdownOpen }));
  }

  logout() {
    AuthService.logout();
    this.setState({ currentUser: undefined });
    window.location.href = '/login'; // Redirect to login page
  }

  render() {
    const { showStudentBoard, showAdminBoard, dropdownOpen } = this.state;

    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-custom">
            <Link to="/" >
              <  img className="imglogo" src="school-logo.png" alt="Logo" width='50px' />
            </Link>
            <div className="navbar-nav mr-auto navcolor">
              <li className="nav-item">
                <Link to="/home" className="link ">Home</Link>
              </li>
       
              {showStudentBoard && (
                <li className="nav-item">
                  <Link to="/mod" className="nav-link">Moderator Board</Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to="/admin" className="link">Admin</Link>
                </li>
              )}
            
            </div>
            {showAdminBoard ? (
              <div className="navbar-nav ml-auto">

                <div className="menu">
                  <button
                    className={`menu-button-icon ${dropdownOpen ? 'active' : ''}`}
                    onClick={this.toggleDropdown}
                  >
                    <i className="fa-solid fa-bars"></i>
                  </button>
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <ul>
                        <li><a href="/register">Sign up</a></li>
                        <li><a href="/profile">Profile</a></li>
                        <li>
                          <a onClick={this.logout}>LogOut</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="link">Login</Link>
                </li>
              </div>
            )}
          </nav>
          <HomeBackgroundSlider />
          <div className="container mt-3">
            <div></div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/about" element={<AboutPage/>} />
             
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<BoardUser />} />
              <Route path="/mod" element={<BoardModerator />} />
              <Route path="/admin/*" element={<BoardAdmin />} />
              <Route path="/studentRegister/*" element={<StudentRegister />} />
              <Route path="/success" element={<StudentRegSuccess/>} />
              <Route path="/studentUpdate" element={<StudentUpdate/>} />
              <Route path="/updatesuccess" element={<Updatesuccesspage/>} />
              <Route path="/deleteStudent" element={<DeleteStudent/>} />
              <Route path="/findStudent" element={<FindStudent/>} />

              <Route path="/studentcard" element={<StudentCard/>} />
              <Route path="/classBtn" element={<ClassButtons/>} />
              <Route path="/class1" element={<Class1/>} />
              <Route path="/class2" element={<Class2/>} />
              <Route path="/class3" element={<Class3/>} />
              <Route path="/class4" element={<Class4/>} />
              <Route path="/class5" element={<Class5/>} />
              <Route path="/class6" element={<Class6/>} />
              <Route path="/class7" element={<Class7/>} />
              <Route path="/class8" element={<Class8/>} />
              <Route path="/class9" element={<Class9/>} />
              <Route path="/class10" element={<Class10/>} />

            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
