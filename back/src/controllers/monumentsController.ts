import {QueryFilterFactory} from "../classes/QueryFilterFactory";

const debug = require('debug')('app:monumentsController');
import MonumentsManager from '../classes/MonumentsManger';
import MonumentsOpenData from "../services/MonumentsOpenData";
import MonumentsMapping from "../services/MonumentsMapping"
import { DBReader, DBInput } from "../interfaces/interfaces";
import { requestErrorHandler } from "../utility/decorators"

export default function monumentsController(dbManager: DBReader | DBInput){
    const monumentsManager = new MonumentsManager(dbManager);

    async function getMonumentById(req: any, res: any) {
        const { id } = req.params;
        const monument = await MonumentsOpenData.getMonumentById(id);
        const monumentMapped = MonumentsMapping.mapOpenDataMonument(monument);
        const innerMonument = await monumentsManager.getMonumentById(id);
        const resultMonument = Object.assign(monumentMapped, innerMonument);

        res.status(200).json(resultMonument);
    }

    async function getMonuments(req: any, res: any) {
        let { filter, limit, skip } = req.query;
        const filterInner = QueryFilterFactory.setupFilter(filter);
        const monuments = await monumentsManager.getMonuments(filterInner, +limit, +skip);

        res.status(200).json(monuments);
    }

    async function getGeographies(req: any, res: any) {
        const geographies = await monumentsManager.getGeographies();
        res.status(200).json(geographies);
    }

    async function commentMonument(req: any, res: any){
        const { id: monumentId } = req.params;
        const  { text: commentText } = req.body;
        const user = req.user;
        await monumentsManager.commentMonument(user._id, monumentId, commentText);

        res.status(200).send("you commented a monument!");
    }

    async function getComments(req: any, res: any){
        const { id: monumentId } = req.params;
        let { limit, skip } = req.query;
        const comments = await monumentsManager.getComments(monumentId, +limit, +skip);

        res.status(200).json(comments);
    }

    async function likeMonument(req: any, res: any){
        const { id: monumentId } = req.params;
        const user = req.user;
        await monumentsManager.likeMonument(user._id, monumentId);

        res.status(200).send("you liked a monument!");
    }

    async function favourMonument(req: any, res: any){
        const { id: monumentId } = req.params;
        const user = req.user;
        await monumentsManager.favourMonument(user._id, monumentId);

        res.status(200).send("you added a monument to favourites!");
    }

    async function getMonumentFavours(req: any, res: any){
        let { limit, skip } = req.query;
        const user = req.user;
        const monuments = await monumentsManager.getMonumentFavours(user._id, +limit, +skip);

        res.status(200).json(monuments);
    }

    return {
        getMonumentById: requestErrorHandler(getMonumentById),
        getMonuments: requestErrorHandler(getMonuments),
        commentMonument: requestErrorHandler(commentMonument),
        likeMonument: requestErrorHandler(likeMonument),
        getComments: requestErrorHandler(getComments),
        favourMonument: requestErrorHandler(favourMonument),
        getMonumentFavours: requestErrorHandler(getMonumentFavours),
        getGeographies: requestErrorHandler(getGeographies)
    }
}
