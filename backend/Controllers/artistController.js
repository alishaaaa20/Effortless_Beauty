import Artist from "../models/ArtistSchema.js";

export const updateArtist = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedArtist = await Artist.findByIdAndUpdate(id, { $set: req.body}, {new: true});

        res.status(200).json({success:true, message:"Updated successfully", data: updatedArtist});
    }
    catch (err) {
        res.status(500).json({success:false, message:"Failed to Update"})
    }
}

export const deleteArtist = async (req,res) => {
    const id = req.params.id;

    try {
        await Artist.findByIdAndDelete(id,
            )

        res.status(200).json({success:true, message:"Deleted successfully"})
    }
    catch (err) {
        res.status(500).json({success:false, message:"Failed to Delete"})
    }
}

export const getSingleArtist = async (req,res) => {
    const id = req.params.id;

    try {
        const artist = await Artist.findById(id)
        .populate("reviews").select("-password");

        res.status(200).json({success:true, message:"Artist found", data: artist})
    }
    catch (err) {
        res.status(500).json({success:false, message:"No user found"})
    }
}

export const getAllArtist = async (req,res) => {

    try {

        const { query } = req.query;
        let artists;

        if (query) {
            artists = await Artist.find({
                isApproved:'approved',
                $or: [
                    { name: { $regex: query, $options: "i"}},
                    { specialization: { $regex: query, $options: "i"}},
                    { location: { $regex: query, $options: "i"}}
                ],
            }).select("-password");
        }else {
            artists = await Artist.find({isApproved: "approved"}).select("-password");
        }
        

        res.status(200).json({success:true, message:"Users found", data: artists})
    }
    catch (err) {
        res.status(500).json({success:false, message:"Not found"})
    }
}

export const getArtistBySearch = async (req, res ) => {
     
    const city = new RegExp(req.query.city, "i");
    const distance = parseInt(req.query.distance);

    try {
        const artists = await Artist.find({
            isApproved: "approved",
            location: city,
            distance: { $gte: distance}
        })

        res.status(200).json({success:true, message:"Users found", data: artists})
    }
    catch (err) {

        res.status(500).json({success:false, message:"Users not found"})
    }
}