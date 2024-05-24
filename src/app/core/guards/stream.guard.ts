import { Observable } from "rxjs";

export interface IDeactiveComponent{
  canExit: () => boolean | Observable<boolean> | Promise<boolean>;
}