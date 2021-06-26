import { HttpRequest, HttpResponse } from "./http.interface";

//sino implementa el método handle no se va a adaptar el controller a la interface
export class ControllerInterface {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
