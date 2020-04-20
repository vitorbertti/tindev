import { Schema, model, Document } from 'mongoose';

interface DevInterface extends Document {
   name?: string;
   user?: string;
   bio?: string;
   avatar?: string;
   likes?: Schema.Types.ObjectId;
   dislikes?: Schema.Types.ObjectId;
}

const DevSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      user: {
         type: String,
         required: true,
      },
      bio: String,
      avatar: {
         type: String,
         required: true,
      },
      likes: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Dev',
         },
      ],
      deslikes: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Dev',
         },
      ],
   },
   {
      timestamps: true,
   }
);

export default model<DevInterface>('Dev', DevSchema);
