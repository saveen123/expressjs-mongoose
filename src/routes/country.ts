import { Router } from "express";
import { CountryModel, ICountry } from "../models/country";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const countries: ICountry[] = await CountryModel.find().exec();
    return res.json(countries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.get("/add/{$name}", async (req, res) => {
  try {

    const countryExists = await CountryModel.findOne({
      name: name,
    }).exec();

    if (countryExists) {
      return res
        .status(409)
        .json({ error: "There is already another country with this name" });
    }

    const newCountry = await CountryModel.create(country);
    return res.status(201).json(newCountry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

export default routes;
