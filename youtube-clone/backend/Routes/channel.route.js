import express from 'express';
import { addChannel, getChannelById, deleteChannel, modifyChannelDetailsById, subscribeToChannel, unsubscribeToChannel } from '../Controller/channel.controller.js';
import { uploadFields } from '../Middleware/storage.multer.js';
import authorise from '../Middleware/authorise.js';
import { validateChannelPostInput, validateChannelUpdateInput } from '../Middleware/channel.middleware.js';

const router = express.Router();

router.post("/", authorise, uploadFields(['channelImage']), validateChannelPostInput, addChannel);
router.delete("/:channel_id", authorise, deleteChannel);
router.get("/:channel_id", getChannelById);
router.patch("/update/:channel_id", authorise, uploadFields(['channelImage','channelBanner']), validateChannelUpdateInput, modifyChannelDetailsById);
router.patch("/subscribe/:channel_id", authorise, subscribeToChannel);
router.patch("/unsubscribe/:channel_id", authorise, unsubscribeToChannel);

export default router;