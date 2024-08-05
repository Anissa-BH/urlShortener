import { Request, Response } from "express";
import Url from "../models/Url";
import shortid from "shortid";
import { isSimpleValidUrl } from "./utils/isSimpleValidUrl";
import { addProtocolIfMissing } from "./utils/addProtocolIfMissing";


export const createShortUrl = async (req: Request, res: Response) => {
  let { originalUrl } = req.body;
  const base = `http://localhost:3000`; 

  // Vérifier si l'URL est valide
  if (!isSimpleValidUrl(originalUrl)) {
    return res.status(400).json({ error: "Invalid original URL" });
  }

  try {
    let url = await Url.findOne({ originalUrl });

    if (url) {
      return res.status(200).json(url);
    } else {
      const urlCode = shortid.generate();
      const shortUrl = `${urlCode}`;

      url = new Url({
        originalUrl,
        shortUrl,
      });

      await url.save();
      return res.status(201).json({
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Database error");
  }
};

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    console.log(`Url object: ${JSON.stringify(url)} --`);

    if (url) {
      url.clicks++;
      console.log(`Url object after incrementation : ${JSON.stringify(url)} --`);
      await url.save();
      const redirectUrl = addProtocolIfMissing(url.originalUrl);
      console.log(`Redirecting to: ${redirectUrl}`);
      res.redirect(301, redirectUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const urls = await Url.find().select("originalUrl shortUrl clicks");
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};
