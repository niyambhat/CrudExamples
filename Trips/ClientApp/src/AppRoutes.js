import {Home} from "./components/Home"
import Main from "./components/Pages/Main";
import Trips from "./components/Pages/Trips";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
    title:"Home",
    path:"/"
  },
  {
    path: '/trips',
    element: <Main/>,
    title:"Trips"
  }
  
];

export default AppRoutes;
