import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/NavBar";
import SignUpForm from "./components/SignUp";
import Login from "./components/Login";
import Carousel from "./components/carousel";
import Home from "./components/Home";
import WithoutNavbar from "./components/WithoutNavbar";
import WithNavbar from "./components/WithNavbar";
import ForgotPassword from "./components/ForgotPassword";
import StarLine from "./components/StarLine";
import { BidHistory } from "./components/BidHistory";
import WinHistory from "./components/WinHistory";
import { Funds } from "./components/Funds";
import { Help } from "./components/Help";
import SecurityPin from "./components/SecurityPin";
import { MadhurNight } from "./components/MadhurNight";
import GameTime from "./components/GameTime";
import EditProfile from "./components/EditProfile";
import Withdraw from "./components/Withdraw";
import { Verify } from "crypto";
import VerifyOtp from "./components/VerifyOtp";
import ChangePassword from "./components/ChangePassword";
import DoublePanna from "./components/DoublePanna";
import GameRates from "./components/GameRates";
import ContactUs from "./components/ContactUs";
import Wallet from "./components/Wallet";
import { useSelector } from "react-redux";
import SinglePanna from "./components/SinglePanna";
import SingleDigit from "./components/singleDigit";
import HalfSangam from "./components/HalfSangam";
import FullSangam from "./components/FullSangam";
import TripplePanna from "./components/TripplePanna";
import JodiPanna from "./components/JodiPanna";
import Transfer from "./components/Transfer";
import GpayDetails from "./components/GpayDetails";

function App() {
  const token = localStorage.getItem("token");
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route element={<WithoutNavbar />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<WithoutNavbar />}>
            <Route path="/signup" element={<SignUpForm />} />
          </Route>
          <Route element={<WithoutNavbar />}>
            <Route path="/security_pin" element={<SecurityPin />} />
          </Route>

          <Route element={<WithNavbar />}>
            {/* <Route path="/" element={<Home />} /> */}
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
          </Route>

          <Route element={<WithoutNavbar />}>
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
          </Route>

          <Route element={<WithoutNavbar />}>
            <Route
              path="/starline"
              element={isLoggedIn ? <StarLine /> : <Navigate to="/login" />}
            />
          </Route>
          <Route element={<WithoutNavbar />}>
            <Route
              path="/bidhistory"
              element={isLoggedIn ? <BidHistory /> : <Navigate to="/login" />}
            />
          </Route>
          <Route element={<WithoutNavbar />}>
            <Route
              path="/winhistory"
              element={isLoggedIn ? <WinHistory /> : <Navigate to="/login" />}
            />
          </Route>

          <Route element={<WithoutNavbar />}>
            <Route
              path="/funds"
              element={isLoggedIn ? <Funds /> : <Navigate to="/login" />}
            />
          </Route>

          <Route element={<WithoutNavbar />}>
            <Route
              path="/help"
              element={isLoggedIn ? <Help /> : <Navigate to="/login" />}
            />
          </Route>

          <Route element={<MadhurNight />}>
            <Route
              path="/madhurnight"
              element={isLoggedIn ? <MadhurNight /> : <Navigate to="/login" />}
            />
          </Route>
          <Route element={<GameTime />}>
            <Route
              path="/gametime"
              element={isLoggedIn ? <GameTime /> : <Navigate to="/login" />}
            />
          </Route>

          <Route element={<EditProfile />}>
            <Route
              path="/editprofile"
              element={isLoggedIn ? <EditProfile /> : <Navigate to="/login" />}
            />
          </Route>

          <Route element={<Withdraw />}>
            <Route
              path="/withdraw"
              element={isLoggedIn ? <Withdraw /> : <Navigate to="/login" />}
            />
          </Route>

          <Route element={<VerifyOtp />}>
            <Route
              path="/VerifyOtp"
              element={isLoggedIn ? <VerifyOtp /> : <Navigate to="/login" />}
            />
          </Route>

          <Route element={<ChangePassword />}>
            <Route
              path="/ChangePassword"
              element={
                isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />
              }
            />
          </Route>

          <Route path="/DoublePanna" element={<DoublePanna />} />

          <Route path="/JodiDigit" element={<JodiPanna />} />

          <Route path="/SinglePanna" element={<SinglePanna />} />

          <Route path="/TripplePanna" element={<TripplePanna />} />

          <Route path="/SingleDigit" element={<SingleDigit />} />

          <Route path="/HalfSangam" element={<HalfSangam />} />

          <Route path="/FullSangam" element={<FullSangam />} />

          <Route path="/transfer" element={<Transfer />} />
          <Route path="/gpay" element={<GpayDetails />} />

          <Route
            path="/GameRates"
            element={isLoggedIn ? <GameRates /> : <Navigate to="/login" />}
          />

          <Route
            path="/ContactUs"
            element={isLoggedIn ? <ContactUs /> : <Navigate to="/login" />}
          />

          <Route
            path="/Wallet"
            element={isLoggedIn ? <Wallet /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
