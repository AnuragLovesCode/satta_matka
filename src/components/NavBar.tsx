import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaChartBar,
  FaHistory,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaMoneyCheck,
  FaPhone,
  FaQuestionCircle,
  FaShareAlt,
  FaStar,
  FaTrophy,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import {
  WhatsappShareButton,
  TelegramShareButton,
  FacebookShareButton,
  EmailShareButton,
  WhatsappIcon,
  TelegramIcon,
  FacebookIcon,
  EmailIcon,
} from "react-share";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, ListItemIcon, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Navbar: React.FC = () => {
  const token = localStorage.getItem("token") || "";
  const shareUrl = "https://smwebdev.co.in/";
  const title = "Check out this awesome site!";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const [walletValue, setWalletValue] = useState();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // by defualt the dialog box is closed
  const [isShareWindowOpen, setIsShareWindowOpen] = useState(false); // share dialog box is opened

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    walletData();
  }, []);

  const walletData = async () => {
    try {
      const response = await fetch(
        "https://development.smapidev.co.in/api/Api/user_status",
        {
          method: "POST",
          headers: {
            token,
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: "ci_session=0b0000be09ab15b1746f67a94c05d0d6761be9f3",
          },
        }
      );
      response
        .json()
        .then((data: any) => {
          setWalletValue(data?.data?.available_points);
        })
        .catch((error: any) => {
          // console.log({ error });
          // alert(error)
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const items = [
    // { text: "test", icon: <FaWallet size={30} /> },
    { path: "/", text: "Home", icon: <FaHome /> },
    { path: "/editprofile", text: "My Profile", icon: <FaUser /> },
    { path: "/funds", text: "Add Funds", icon: <FaMoneyBill /> },
    { path: "/withdraw", text: "Withdraw", icon: <FaMoneyCheck /> },
    { path: "/wallet", text: "Wallet Statement", icon: <FaWallet /> },
    { path: "/winhistory", text: "Win History", icon: <FaTrophy /> },
    { path: "/bidhistory", text: "Bid History", icon: <FaHistory /> },
    { path: "/gamerates", text: "Game Rates", icon: <FaChartBar /> },
    { path: "/help", text: "How to Play", icon: <FaQuestionCircle /> },
    { path: "/contactus", text: "Contact Us", icon: <FaPhone /> },
    { path: "/share", text: "Share with Friends", icon: <FaShareAlt /> },
    // { path: '/rateapp', text: "Rate App", icon: <FaStar /> },
    { path: "/ChangePassword", text: "Change Password", icon: <FaLock /> },
    { path: "/logout", text: "Logout", icon: <FaLock /> },
  ];

  const handleItemClick = (item: string) => {
    if (item === "/logout") {
      setIsLogoutDialogOpen(true);
    } else if (item === "/share") {
      setIsShareWindowOpen(true);
    } else {
      navigate(item);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGIN_FAILURE",
      payload: { token: null, isLoggedIn: false },
    });
    navigate("login");
  };

  return (
    <div className="navbar-main p-3 bg-blue-800">
      <div className="wallet-row-reverse container mx-auto flex items-center justify-between">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("Wallet");
          }}
          className="text-white text-sm font-medium flex items-center"
        >
          <FaWallet size={30} /> {walletValue}
        </div>

        <div className="text-white text-md font-medium overflow-hidden">
          <div className="marquee font-bold">Welcome to Kalyan Satta Matka</div>
        </div>

        <div onClick={toggleSidebar} className="lg:flex items-center">
          <span className="text-white pr-2 flex items-center justify-between">
            <FaBars />
          </span>
        </div>
      </div>
      <div className="app-container overflow-7">
        {/* Your existing app content */}
        <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
          <div className="custom-color mx-auto w-500 text-white">
            <List>
              {items.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleItemClick(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
      <Dialog
        open={isLogoutDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are u Sure ?</DialogTitle>

        <DialogActions>
          <Button
            onClick={() => setIsLogoutDialogOpen(false)}
            className=" !text-red-600"
          >
            Cancel
          </Button>
          <Button onClick={handleLogout} autoFocus className="!text-green-600">
            Sure
          </Button>
        </DialogActions>
      </Dialog>
      {/* share with your friends */}
      <Dialog
        open={isShareWindowOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Share with Friends</DialogTitle>
        <DialogContent>
          <div className="share-buttons flex justify-evenly gap-3">
            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton url={shareUrl} title={title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <FacebookShareButton url={shareUrl} title={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <EmailShareButton url={shareUrl} title={title}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setIsShareWindowOpen(false)}
            className=" !text-red-600"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
