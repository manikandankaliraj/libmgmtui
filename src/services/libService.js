import http from "./httpservices";
import config from "../config.json";
export function getLibraries() {
  return http.get(config.apiEndPoint + "/libraries");
}
