import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./containers/home/home";
import Navbar from "./component/navbar/navbar";
import Dashboard from "./component/dashboard/dashboard";
import FQA from "./component/faq/FQ&A";
import Login from "./component/login/Login";
import SignUp from "./component/signUp/SignUp";
import Navbarlogo from "./component/navbar/Navbarlogo";
import Header from "./containers/header/header";
import Footer from "./containers/footer/footer";
import Features from "./containers/features/features";
import About from "./containers/about/about";
import CTA from "./containers/CTA/CTA";
import Blog from "./containers/blog/Blog";
import FAQ from "./containers/f&q/FAQ";
import Scanns from "./component/dashboard/Scann";
import Target from "./component/dashboard/Target";
import Homedash from "./component/dashboard/Homedash";
import Cont from "./component/contect/cont";
import WebScan from "./component/dashboard/webSan";
import BlogPage from "./component/blog/blog";
import Uploadfile from "./component/uploadfile/uploadfile";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="gradient__bg">
                  <Navbar />
                  <Header />
                </div>

                <Home />
                <Features />
                <About />
                <CTA />
                <Blog />
                <FAQ />
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Outlet />
              </>
            }
          >
            <Route path="" element={<Dashboard />} />

            <Route path="scanns" element={<Outlet />}>
              <Route path="" element={<Scanns />} />
            </Route>

            <Route path="networkscan/:host/" element={<Target />} />

            <Route path="webscan/*" element={<WebScan />} />
            
          </Route>

          <Route path="/faq" element={<FQA />} />
          <Route path="/contect" element={<Cont />} />
          <Route path="/uploadfile" element={<Uploadfile />} />
          <Route
            path="/login"
            element={
              <>
                <Navbarlogo /> <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbarlogo /> <SignUp />
              </>
            }
          />
         <Route path="/blog/:id" element={<BlogPage />} />
        
        
       
        
      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
