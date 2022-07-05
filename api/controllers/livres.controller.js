import livres from "../models/livres.model.js";
import mongoose from "mongoose";
import { escape } from "html-escaper";

export const getLivres = async (req, res) => {
    try {
        const livre = await livres.find().populate('auteurs').populate('specialite').populate('maisonedit', '-siteweb -email');
        res.status(200).json(livre);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getOneLivre = async (req, res) => {
    try {
        const livre = await livres.findById(req.params.id).populate('auteurs').populate('specialite').populate('maised');
        res.status(200).json(livre);
    }catch(error){
        res.send("not found");
    }
}

export const createLivre = async (req, res, next) => { 
    const url = req.protocol + '://' + req.get('host') + '/'
    const couv = req.file.filename
    const newLivre = new livres({ 
        isbn:req.body.isbn,
        titre:req.body.titre,
        prix:req.body.prix,
        annedition:req.body.annedition,
        couverture:url + couv,
        qtestock:req.body.qtestock,
        auteurs:req.body.auteurs,
        maisonedit:req.body.maisonedit,
        specialite:req.body.specialite
    })

    try {  
        await newLivre.save();

        res.status(201).json(newLivre );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const updateLivre = async (req, res) => {
    const { id } = escape(req.params);
    
    const livre = escape(req.body);
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("pas de livre avec un id: " + escape(id));

    const liv = { ...livre , _id: id };

    await livres.findByIdAndUpdate(req.params.id, liv);

    res.json(liv);
};

export const deleteLivre = async (req, res) => {
    try {
        const livre = await livres.findByIdAndRemove(req.params.id);
        res.status(200).json(livre)
    }catch(error){
        res.staus(404).json({message: error.message})
    }
}