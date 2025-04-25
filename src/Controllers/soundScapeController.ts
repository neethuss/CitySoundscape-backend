import { Response } from 'express'
import { CustomRequest } from '../Middlewares/authenticationMiddleware'
import User from '../Models/userModel'
import SoundScape from '../Models/soundScapeModel'


//handing adding new mix 
export const postSoundScape = async(req:CustomRequest, res:Response)=>{
  try {
    const username = req.user
    const existingUser = await User.findOne({username})
    if(!existingUser){
      return res.status(404).send('User not found')
    }
    
    const {name, sounds} = req.body

    //creating new mix and saving
    const newMix = new SoundScape({
      user : existingUser?._id,name, sounds
    })
    await newMix.save()
    return res.status(201).send({ message: "Mix saved successfully", mix: newMix });
  } catch (error) {
    console.error('❌ Error in postSoundScape:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}


//retreive all saved mix for a particular user
export const getAllSavedMix = async(req:CustomRequest, res:Response)=>{
  try {
    const username = req.user
    const existingUser = await User.findOne({username})
    if(!existingUser){
      return res.status(404).send('User not found')
    }
    
    const allSavedMix = await SoundScape.find({user:existingUser._id})
    return res.status(200).send(allSavedMix)

  } catch (error) {
    console.error('❌ Error in getAllSavedMix:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}


//retreiving a single mix by its id
export const getMixById = async(req:CustomRequest, res:Response)=>{
  try {
    const {id} = req.params
    const existingMix = await SoundScape.findById(id)
    if(!existingMix){
      return res.status(404).send({ message: 'Mix not found' });
    }
    
    return res.status(200).send(existingMix)

  } catch (error) {
    console.error('❌ Error in getMixById:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}


//handing edit a mix by id
export const editMixById = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, sounds } = req.body;

    const updatedMix = await SoundScape.findByIdAndUpdate(
      id,
      { name, sounds },
      { new: true } 
    );

    if (!updatedMix) {
      return res.status(404).send({ message: 'Mix not found' });
    }

    return res.status(200).send(updatedMix);

  } catch (error) {
    console.error('❌ Error in editMixById:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};
