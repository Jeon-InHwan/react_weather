import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Header />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
