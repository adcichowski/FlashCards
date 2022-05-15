import { Router } from "express";
import { reusableValidation } from "src/utils/reusableValidation";

import { rateCard, updateRate } from "./rate-controller";
import { validateSchemaRate } from "./rate-schema";

const router = Router();
router.post("/rate", reusableValidation(validateSchemaRate), rateCard);
router.put("/rate", reusableValidation(validateSchemaRate), updateRate);
