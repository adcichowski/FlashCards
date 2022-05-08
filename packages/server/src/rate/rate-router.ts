import { Router } from "express";

import { rateCard } from "./rate-controller";

const router = Router();
router.post("/rate", rateCard);
