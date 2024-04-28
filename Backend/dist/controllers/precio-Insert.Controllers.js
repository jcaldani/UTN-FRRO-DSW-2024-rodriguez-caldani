import { PrecioRepository } from '../repository/precioRespository.js';
import { Precio } from '../model/precio.entity.js';
import { ComponenteRepository } from '../repository/componenteRepository.js';
const precioRepo = new PrecioRepository();
const componenteRepo = new ComponenteRepository();
const precioInsertController = async (req, res) => {
    const { fechaDesde, componenteId, valor } = req.body;
    try {
        const componente = await componenteRepo.findOne({ id: componenteId });
        const precio = await precioRepo.findOne({ fechaDesde: fechaDesde, componenteId: componenteId });
        if (precio === undefined && componente != undefined) {
            const new_precio = new Precio(fechaDesde, valor, componente);
            precioRepo.add(new_precio);
            res.status(201).json({
                data: new_precio,
                message: "The precio was added"
            });
        }
        else {
            res.status(404).json({
                data: undefined,
                message: 'precio incorrect credentials'
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
export default precioInsertController;
//# sourceMappingURL=precio-Insert.Controllers.js.map