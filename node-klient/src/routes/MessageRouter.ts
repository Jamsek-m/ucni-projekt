import {NextFunction, Request, Response, Router} from "express";
import {MessageService} from "../services/MessageService";

export class MessageRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get("/", this.getDailyMessage);
    }

    public getDailyMessage(req: Request, res: Response, next: NextFunction) {
        MessageService.pridobiSporocilo((err, sporocilo) => {
            if (!err) {
                res.status(200);
                res.json(sporocilo);
            } else {
                throw err;
            }
        });
    }

}

const indexRoutes = new MessageRouter().router;

export default indexRoutes;
