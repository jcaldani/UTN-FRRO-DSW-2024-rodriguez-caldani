import { Request, Response } from 'express';
import { LineaCompraRepository } from '../repository/lineaCompraRepository.js';



const lineaCompraRepo = new LineaCompraRepository();

const lineaCompraDeleteOneController = async (req: Request, res: Response): Promise<void> => {       
    const {lineaId, compraId} = req.body;

    try{
        
        const lineaCompra = await lineaCompraRepo.findOne({id:lineaId});

        if (lineaCompra) {
            if(!lineaCompra.id||!lineaCompra.compra.id){
                res.status(404).json({
                    data: undefined,
                    message: 'lineaCompra incorrect credentials'
                });
                return;
            }
        const lineaCompra_deleted = await lineaCompraRepo.delete({id:lineaCompra.id});
        res.status(200).json({
        data: lineaCompra_deleted,
        message: "The lineaCompra was deleted"
        });
        } 
        else {
            res.status(404).json({
                data: undefined,
                message: 'lineaCompra incorrect credentials'
            });
        }
        
        

    }
    catch (error) {
        console.error(error);
         res.status(500).json({
            data: undefined,
            message: 'There was a server error'
        });
    }     
};

export default lineaCompraDeleteOneController;