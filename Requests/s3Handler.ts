// @ts-nocheck
import { uploadFile, downloadFile } from "../aws/awsS3";
import express, { Express, Request, Response } from "express";
import images from "../models/images.model";
import { generateKey, getDateTime } from "../common/common_functions";
import fs from "fs";
import util from "util";
import multiparty from "multiparty"

const unlinkFile = util.promisify(fs.unlink);

export const uploadHandler = async (req: Request, res: Response) => {
  const form = new multiparty.Form();
  form.parse(req, async(_err, _fields, files) => {
    // console.log(files)
    // console.log(_fields)
    const file = new Uint8Array(Buffer.from(_fields.image))
    console.log(file)
    fs.writeFile('hello.jpg',file)
    const currDateTime = getDateTime();
    const newKey = generateKey();
    try {
      if (_fields.username) {
        const result = await uploadFile(file,newKey);
        await unlinkFile(file?.path);
        await images.create({
          username: _fields.username[0],
          imageKey: newKey,
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

  })

 
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
