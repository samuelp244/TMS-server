// @ts-nocheck
import { uploadFile, downloadFile } from "../aws/awsS3";
import express, { Express, Request, Response } from "express";
import images from "../models/images.model";
import { generateKey, getDateTime } from "../common/common_functions";
import fs from "fs";
import util from "util";
import multiparty from "multiparty";

const unlinkFile = util.promisify(fs.unlink);

export const uploadHandler = async (req: Request, res: Response) => {
  console.log(req)
const file = req.file;
const currDateTime = getDateTime();
try {
  if (req.body.username) {
    const result = await uploadFile(file);
    await unlinkFile(file?.path);
    await images.create({
      username: req.body.username,
      imageKey: result.Key,
      imageName: currDateTime,
    });
    res.json({ message: "upload success" });
  } else {
    await unlinkFile(file?.path);
    res.json({ message: "username missing!" });
  }
} catch (e) {
  console.log(e);
  res.json({ message: "upload failed" });
}
};

export const downloadHandler = async (req: Request, res: Response) => {
  const key = req.params.key;
  try {
    const readStream = downloadFile(key);
    readStream.pipe(res);
  } catch (e) {
    res.json({ message: "invalid Key" });
  }
};

export const listImagesHandler = async (req: Request, res: Response) => {
  const user = req.params.user;
  try {
    const imageList = await images.find({ username: user });
    res.json({ images: imageList });
  } catch (e) {
    console.log(e);
    res.json({ error: "404" });
  }
};
