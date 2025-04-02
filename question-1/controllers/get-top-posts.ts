import {Response, Request} from "express";

import {apiUserClient, sendRequest} from "../utils/init";

export const getTopPost = async function (req: Request, res: Response): Promise<any> {
  const token = await apiUserClient();
  const response = await token.get("http://20.244.56.144/evaluation-service/users");

  console.log(response);

  return res.json(response.data);
}