import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import {Route, BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext'

 function App() {
    return (
     <AuthContextProvider>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </BrowserRouter>
      </AuthContextProvider>
  

  );
}

export default App;
