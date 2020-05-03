
const debug = require('debug')('app:monumentsController');
import MonumentsManager from '../classes/MonumentsManger';
import MonumentsOpenData from "../services/MonumentsOpenData";
import { DBReader, DBInput } from "../interfaces/interfaces";

export default function monumentsController(dbManager: DBReader | DBInput){
    const monumentsManager = new MonumentsManager(dbManager);

    async function getMonumentById(req: any, res: any) {
        const { id } = req.params;
        const monument = await MonumentsOpenData.getMonumentById(id);
        const innerMonument = await monumentsManager.getMonumentById(id);
        const resultMonument = Object.assign(monument, innerMonument);
        res.json(resultMonument);
    }

    async function getMonuments(req: any, res: any) {
        let { limit, filter } = req.query;
        const monuments = await monumentsManager.getMonuments(limit, filter);
        res.json(monuments);
    }

    async function commentMonument(req: any, res: any){
        const { id: monumentId } = req.params;
        const  { text: commentText} = req.body;
        if( req.isAuthenticated() ){
            const user = req.user;
            await monumentsManager.commentMonument(user._id, monumentId, commentText);
            res.send("you commented a monument!");
        } else {
            res.redirect('/authentication_form.html');
        }
    }

    async function likeMonument(req: any, res: any){
        const { id: monumentId } = req.params;
        if(req.isAuthenticated()){
            const user = req.user;
            await monumentsManager.likeMonument(user._id, monumentId);
            res.send("you liked a monument!");
        } else {
            res.redirect('/authentication_form.html');
        }
    }

    return {
        getMonumentById,
        getMonuments,
        commentMonument,
        likeMonument
    }
}
