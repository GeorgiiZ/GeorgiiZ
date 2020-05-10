const debug = require('debug')('app:monumentsController');
import MonumentsManager from '../classes/MonumentsManger';
import MonumentsOpenData from "../services/MonumentsOpenData";
import MonumentsMapping from "../services/MonumentsMapping"
import { DBReader, DBInput } from "../interfaces/interfaces";

export default function monumentsController(dbManager: DBReader | DBInput){
    const monumentsManager = new MonumentsManager(dbManager);

    async function getMonumentById(req: any, res: any) {
        const { id } = req.params;
        const monument = await MonumentsOpenData.getMonumentById(id);
        const monumentMapped = MonumentsMapping.mapOpenDataMonument(monument);
        const innerMonument = await monumentsManager.getMonumentById(id);
        const resultMonument = Object.assign(monumentMapped, innerMonument);

        res.json(resultMonument);
    }

    async function getMonuments(req: any, res: any) {
            let { filter, limit, skip } = req.query;
            const monuments = await monumentsManager.getMonuments(filter, +limit, +skip);

            res.json(monuments);
    }

    async function commentMonument(req: any, res: any){
        const { id: monumentId } = req.params;
        const  { text: commentText } = req.body;
        const user = req.user;
        await monumentsManager.commentMonument(user._id, monumentId, commentText);

        res.send("you commented a monument!");
    }

    async function getComments(req: any, res: any){
        const { id: monumentId } = req.params;
        let { limit, skip } = req.query;
        const comments = await monumentsManager.getComments(monumentId, +limit, +skip);

        res.json(comments);
    }

    async function likeMonument(req: any, res: any){
        const { id: monumentId } = req.params;
        const user = req.user;
        await monumentsManager.likeMonument(user._id, monumentId);

        res.send("you liked a monument!");
    }

    async function favourMonument(req: any, res: any){
        const { id: monumentId } = req.params;
        const user = req.user;
        await monumentsManager.favourMonument(user._id, monumentId);

        res.send("you added a monument to favourites!");
    }

    async function getMonumentFavours(req: any, res: any){
        let { limit, skip } = req.query;
        const user = req.user;
        const monuments = await monumentsManager.getMonumentFavours(user._id, +limit, +skip);

        res.json(monuments);
    }

    function errorHandleWrapper(fn: Function){
        return function (req: any, res: any) {
            try {
                fn(req, res);
            } catch(err){
                res.send("Something went wrong...")
            }
        }
    }

    return {
        getMonumentById: errorHandleWrapper(getMonumentById),
        getMonuments: errorHandleWrapper(getMonuments),
        commentMonument: errorHandleWrapper(commentMonument),
        likeMonument: errorHandleWrapper(likeMonument),
        getComments: errorHandleWrapper(getComments),
        favourMonument: errorHandleWrapper(favourMonument),
        getMonumentFavours: errorHandleWrapper(getMonumentFavours)
    }
}
