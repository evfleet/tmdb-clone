import * as createRoutes from "next-routes";
import Routes from "next-routes";

// @ts-ignore
const routes: Routes = createRoutes();

routes.add("tv", "/tv/:id", "tv").add("movie", "/movie/:id", "movie");

export default routes;
export const Link = routes.Link;
export const Router = routes.Router;
