import { BrowserRouter, Switch, Route } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <h1>Hey</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
