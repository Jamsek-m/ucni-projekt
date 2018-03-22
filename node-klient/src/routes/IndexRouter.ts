import {NextFunction, Request, Response, Router} from "express";
/* tslint:disable no-var-requires */
/* tslint:enable no-var-requires */
import { VprasanjeService } from "../services/VprasanjeService";

export class IndexRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get("/", this.getAll);
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        VprasanjeService.pridobiSeznamVprasanj((napaka, podatki) => {
            if (napaka) {
                res.json({napaka});
            } else {
                res.json({podatki});
            }
        });
    }

}

const indexRoutes = new IndexRouter().router;

export default indexRoutes;
