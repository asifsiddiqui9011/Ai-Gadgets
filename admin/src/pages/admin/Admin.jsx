import { Routes, Route } from "react-router-dom";
 
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Admin.css";
import Addproduct from "../../components/Addproduct/Addproduct.jsx";
import Listproduct from "../../components/Listproduct/Listproduct.jsx";
import Orderlist from "../../components/Orderlist/Orderlist.jsx";

function Admin() {
  return (
    <div className="admin">
      <Sidebar/>
      <Routes>
        <Route path={'/addproduct'} element={<Addproduct/>}/>
        <Route path={'/listproduct'}element={<Listproduct/>}/>
        <Route path={'/orderlist'}element={<Orderlist/>}/>
      </Routes>
    </div>
  )
}

export default Admin
