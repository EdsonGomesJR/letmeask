import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext';
import { ChakraProvider } from "@chakra-ui/react"
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";
import React from "react";

 function App() {
    return (
      <ChakraProvider>
     <AuthContextProvider>
        <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new"  component={NewRoom} />
     
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />

          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
      </ChakraProvider>
  

  );
}

export default App;
