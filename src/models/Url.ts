import { Schema, model } from 'mongoose';

interface IUrl {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
}

const urlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 }
});

const Url = model<IUrl>('Url', urlSchema);

export default Url;
