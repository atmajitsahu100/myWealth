import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server, AuthContext } from "../context/UserContext";
import FixedBillComp from "../components/billComponents/FixedBillComp";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { PieChart } from "@mui/x-charts/PieChart";
import { mainListItems, secondaryListItems } from "./dashboard/listItems";
import Chart from "./dashboard/Chart";
import Deposits from "./dashboard/Deposits";
import Orders from "./dashboard/Orders";
import DailyExpComp from "../components/billComponents/DailyExpComp";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, userId, setUserId } =
    useContext(AuthContext);
  const [dailyExp, setDailyExp] = useState([]);
  const [balance, setBalance] = useState();
  const [lifetime, setLifetime] = useState({fixedBillTotal : 0, dailyExpTotal : 0, investmentTotal : 0, })
  const [monthly, setMonthly] = useState({fixedBillTotal : 0, dailyExpTotal : 0, investmentTotal : 0, })
  const [yearly, setYearly] = useState({fixedBillTotal : 0, dailyExpTotal : 0, investmentTotal : 0, })

  const fetchUserDetail = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(`${server}/getUserDetails/${userId}`);
      setDailyExp(response.data.user.dailyExps);
      setBalance(response.data.user.balance);
      console.log(response.data.user);    
      const { fixedBills, dailyExps, investments } = response.data.user;
      const fixedBillAmount = fixedBills.reduce((acc, bill) => acc + bill.cost, 0);
      const dailyExpAmount = dailyExps.reduce((acc, exp) => acc + exp.cost, 0);
      const investmentAmount = investments.reduce((acc, investment) => acc + investment.amount, 0);
      setLifetime({fixedBillTotal : fixedBillAmount, dailyExpTotal : dailyExpAmount, investmentTotal : investmentAmount});

      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      
      const monthlyData = {
        fixedBillTotal: fixedBills.reduce((acc, exp) => {
          const expMonth = new Date(exp.createdAt).getMonth() + 1;
          const expYear = new Date(exp.createdAt).getFullYear();
          return expMonth === currentMonth && expYear === currentYear
            ? acc + exp.cost
            : acc;
        }, 0),
        dailyExpTotal: dailyExps.reduce((acc, bill) => {
          const billMonth = new Date(bill.createdAt).getMonth() + 1;
          const billYear = new Date(bill.createdAt).getFullYear();
          return billMonth === currentMonth && billYear === currentYear
            ? acc + bill.cost
            : acc;
        }, 0),
        investmentTotal: investments.reduce((acc, investment) => {
          const investmentMonth = new Date(investment.date).getMonth() + 1;
          const investmentYear = new Date(investment.date).getFullYear();
          return investmentMonth === currentMonth && investmentYear === currentYear
            ? acc + investment.amount
            : acc;
        }, 0),
      };
      setMonthly(monthlyData);

      const yearlyData = {
        fixedBillTotal: fixedBills.reduce((acc, exp) => {
          const expYear = new Date(exp.createdAt).getFullYear();
          return expYear === currentYear
            ? acc + exp.cost
            : acc;
        }, 0),
        dailyExpTotal: dailyExp.reduce((acc, bill) => {
          const billYear = new Date(bill.createdAt).getFullYear();
          return billYear === currentYear
            ? acc + bill.cost
            : acc;
        }, 0),
        investmentTotal: investments.reduce((acc, investment) => {
          const investmentYear = new Date(investment.date).getFullYear();
          return investmentYear === currentYear
            ? acc + investment.amount
            : acc;
        }, 0),
      };
      setYearly(yearlyData);
      toast.success("user data fetched");
    } catch (error) {
      toast.error("something went wrong while user data fetching");
    }
  };

  const addNewFixedBill = async (name, val) => {
    try {
      const response = await axios.post(
        `${server}/addNewFixedBill`,
        { userId: userId, name: name, val: val },
        { withCredentials: true }
      );
      console.log(response);
      toast.success("new bill added");
    } catch (error) {
      toast.error("new bill not added");
    }
  };

  const payAllBill = async () => {};

  useEffect(() => {
    fetchUserDetail();
  }, [navigate]);

  const data = [
    { id: 0, value: lifetime.fixedBillTotal, label: "Fixed Bills" },
    { id: 1, value: lifetime.dailyExpTotal, label: "Daily Expenses" },
    { id: 2, value: lifetime.investmentTotal, label: "Investments" },
    { id: 3, value: balance, label: "Bank Balance" },
  ];

  const monthlyData = [
    { id: 0, value: monthly.fixedBillTotal, label: "Fixed Bills" },
    { id: 1, value: monthly.dailyExpTotal, label: "Daily Expenses" },
    { id: 2, value: monthly.investmentTotal, label: "Investments" },
    { id: 3, value: balance, label: "Bank Balance" },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {/* <Chart /> */}
                  <PieChart series={[ {
                                data, highlightScope: { faded: "global", highlighted: "item", },
                                faded: { innerRadius: 30, additionalRadius: -30, color: "gray", },
                              }, ]}
                  height={200}  />
                  <PieChart series={[ {
                                data : monthlyData, highlightScope: { faded: "global", highlighted: "item", },
                                faded: { innerRadius: 30, additionalRadius: -30, color: "gray", },
                              }, ]}
                  height={200}  />
                  <PieChart series={[ {
                                data, highlightScope: { faded: "global", highlighted: "item", },
                                faded: { innerRadius: 30, additionalRadius: -30, color: "gray", },
                              }, ]}
                  height={200}  />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
            <FixedBillComp />
            <DailyExpComp
              dailyExp={dailyExp}
              setDailyExp={setDailyExp}
              balance={balance}
              setBalance={setBalance}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
