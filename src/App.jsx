import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Create from "./components/User/Create/Create";
import Details from "./components/User/Details/Details";
import ShowAll from "./components/User/ShowAll/ShowAll";
import Delete from "./components/User/Delete/Delete";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "./components/User/Update/Update";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/show-all" element={<ShowAll />} />
          <Route path="/user/create" element={<Create />} />
          <Route path="/user/delete" element={<Delete />} />
          <Route path="/user/update/:id" element={<Update />} />
          <Route path="/user/update" element={<Update />} />
          <Route path="/user/:id" element={<Details />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
