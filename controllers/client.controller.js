import Client from "../models/client.model.js"

export const getClients = async (req, res) => {
    try {
        const client = await Client.find();
        res.status(200).json(client);
    }catch {
        res.status(404).json({message: error.message});
    }
}


export const getOneClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.status(200).json(client);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}