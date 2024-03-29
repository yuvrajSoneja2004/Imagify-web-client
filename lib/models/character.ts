import { Schema, model, Document, models, Model } from 'mongoose';

// Define the interface for the Character document
interface ICharacter extends Document {
  name: string;
  greeting: string;
  avatar: string;
  anger: number;
  rudeness: number;
  kindness: number;
  excitement: number;
  createdAt: Date;
  createdBy: object;
  likes: any[];
  views: any[];
  currentlyOnline: number;
}

// Define the Character schema
const characterSchema = new Schema<ICharacter>({
  name: { type: String, default: 'NOT_SPECIFIED', required: true },
  greeting: {
    type: String,
    default: 'NOT_SPECIFIED',
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  avatar: { type: String, default: 'NOT_SPECIFIED' },
  anger: { type: Number, default: 0, required: true },
  rudeness: { type: Number, default: 0, required: true },
  kindness: { type: Number, default: 0, required: true },
  excitement: { type: Number, default: 0, required: true },
  createdAt: { type: Date, default: Date.now() },
  category: { type: String, default: 'General' },
  createdBy: { type: Object, default: {}, required: true },
  likes: { type: Array, default: [] },
  conversationHistory: { type: Array, default: [] },
  views: { type: Array, default: [] },
  currentlyOnline: { type: Number, default: 0 },
});

// Define the Character model using the schema
const Character: Model<ICharacter> =
  models.character || model<ICharacter>('character', characterSchema);

export default Character;

/**
 * Character Document Interface.
 *
 * This interface represents the structure of a Character document in MongoDB.
 * It extends the mongoose.Document interface.
 */

/**
 * Character Schema.
 *
 * This schema defines the structure and validation rules for the Character model.
 * It uses the ICharacter interface to ensure type safety.
 */

/**
 * Character Model.
 *
 * This model represents the Character collection in MongoDB.
 * It is created based on the Character schema and includes additional methods provided by mongoose.
 */
