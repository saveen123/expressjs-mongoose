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

router.get("/add/:name", async (req, res) => {
  try {
    const { name } = req.params;

    // Check if country already exists
    const countryExists = await CountryModel.findOne({ name }).exec();
    if (countryExists) {
      return res
        .status(409)
        .json({ error: "There is already another country with this name" });
    }

    // Create a new country
    const newCountry = await CountryModel.create({ name });
    return res.status(201).json(newCountry);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
})

export default routes;
