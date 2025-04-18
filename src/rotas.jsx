import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cadastro from "./paginas/cadastro/index";
import Login from "./paginas/login";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/cadastro" element={<Cadastro/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;