import routes from "routing";
import { generatePath } from "react-router";

export function generateRoutePath(
  name: keyof typeof routes,
  { params }: { params?: any } = {}
) {
  const route = routes[name];
  return generatePath(route.path, {
    ...route.defaultParams,
    ...params,
  });
}
