const urlStates = {
  "#/": "All",
  "#/completed": "Completed",
  "#/active": "Active"
}

const Router = {
    routes: {},
    currentRoute: '',
  
    register(route, callback) {
      this.routes[route] = callback;
    },
  
    navigate(route) {
      if (this.routes[route]) {
        this.currentRoute = route;
        window.location.hash = route;
        this.routes[route]();
      }
    },
  
    init(url) {
      window.onhashchange = () => {
        const hash = window.location.hash;
        url.setState(urlStates[hash])
        this.navigate(hash);
      };
    },
  };
  
  export default Router;