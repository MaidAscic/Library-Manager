import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import DataTab from "../components/DataTab/DataTab";

class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <NavBar />

          <DataTab/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
