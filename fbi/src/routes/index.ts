import express, { Request, Response } from "express";
import { natsWrapper } from "../nats-wrapper";
import { endPoints } from "../endpoints/index";
import { BadRequestError, requireAuth } from "@sweettech123/common";
import { FBIWantedListFetched } from "../events/publishers/FBIWantedListFetched";
import axios from "axios";
import { FBIListResponse } from "../interfaces";

const router = express.Router();

router.get(
  "/api/fbi/list/:page?/:field_offices?",
  async (req: Request, res: Response) => {
    let { page, field_offices } = req.params;
    if (typeof page !== "undefined") {
      // @ts-ignore
      if (isNaN(page)) {
        throw new BadRequestError("Page number must be integer");
      }
    }

    field_offices = field_offices ?? "";
    page = page ?? 1;
    // Try to fetch from redis server first
    try {
      const response = await axios.get<FBIListResponse>(
        `${endPoints.FBIWantedList}?page=${page}&field_offices=${field_offices}`
      );

      try {
        // Publish the event that list has been fetched
        new FBIWantedListFetched(natsWrapper.client).publish({
          total: response.data.total,
          items: response.data.items,
        });
      } catch (error) {
        console.log(error);
      }
      return res.send(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }
);

router.get(
  "/api/fbi/fbiById/:uid",
  requireAuth,
  async (req: Request, res: Response) => {
    let { uid } = req.params;
    if (typeof uid === "undefined") {
      throw new BadRequestError("User id required");
    }
    try {
      const response = await axios.get(`${endPoints.FBIWantedListById}/${uid}`);
      return res.send(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }
);

export { router as indexFBIRouter };
