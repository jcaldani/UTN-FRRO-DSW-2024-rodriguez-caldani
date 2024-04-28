import { LineaCompra } from '../model/lineaCompra.entity.js'; 
import { orm } from '../shared/db/orm.js';

const em = orm.em;

export class LineaCompraRepository  {

    async findAll(): Promise<LineaCompra[] | undefined> { 
        try {
            const lineaCompras = await em.find(
                LineaCompra,
                {}
                ,{ populate: ['compra'
                //, 'componente'
            ] }
            );
            return lineaCompras;
        } catch (error: any) {
            return undefined;
        }
    }
    

    async findOne(item: { nroLinea: number, compraId:number }): Promise<LineaCompra | undefined> {
        try {
            
            const liena_compra= await em.findOneOrFail(
                LineaCompra,
                { nroLinea: item.nroLinea, compra:{id: item.compraId} }
                //,{ populate: ['compra', 'componente'] }
            );
            return liena_compra;
        } catch (error: any) {
            return undefined;
        }
    }

    

    async add(item: LineaCompra): Promise<LineaCompra | undefined> {
        try {
            const new_lineaCompra = em.create(LineaCompra, item)
            await em.flush()
            return new_lineaCompra;
          } catch (error: any) {
           return undefined;
          }
    }

    async update(item: LineaCompra): Promise<LineaCompra | undefined>{
        try {            
            const nroLinea = item.nroLinea;
            const lineaCompraToUpdate = await em.findOneOrFail(LineaCompra, { nroLinea, compra:{id:item.compra.id} })
            em.assign(lineaCompraToUpdate, item)
            await em.flush()
            return lineaCompraToUpdate;
            
          } catch (error: any) {
            return undefined;
          }
    }

    async delete(item: { nroLinea: number, compraId:number }): Promise<LineaCompra | undefined> {
        try {
            
              
            const linea_compra = await this.findOne(item);

            if (linea_compra) {
                await em.removeAndFlush(linea_compra);
                return linea_compra;
            } else {
                console.error('LineaCompra not found');
                return undefined;
            }

          } catch (error: any) {
            return undefined;
          }
    }
    
    



    async updateCantidad(item: LineaCompra, newCantidad:number): Promise<LineaCompra | undefined> {
        try {
            
            if (!item.compra || !item.compra.id||!item.nroLinea) {
                console.error('ERROR');
                return undefined;
            }
            const lineaCompraToUpdate = await this.findOne({ nroLinea: item.nroLinea, compraId: item.compra.id });
            if (lineaCompraToUpdate) {
            lineaCompraToUpdate.cantidad = newCantidad;
            await em.persistAndFlush(lineaCompraToUpdate);
            return lineaCompraToUpdate;
            } 
            else {
            console.error('LineaCompra not found');
            return undefined;
            }

        } catch (error: any) {
            return undefined;
        }
        }

        async updateSubTotal(item: LineaCompra, newSubTotal:number): Promise<LineaCompra | undefined> {
            try {

                if (!item.compra || !item.compra.id||!item.nroLinea) {
                    console.error('ERROR');
                    return undefined;
                }
                
                const lineaCompraToUpdate = await this.findOne({ nroLinea: item.nroLinea, compraId: item.compra.id });
                if (lineaCompraToUpdate) {
                lineaCompraToUpdate.subTotal = newSubTotal;
                await em.persistAndFlush(lineaCompraToUpdate);
                return lineaCompraToUpdate;
                } 
                else {
                console.error('LineaCompra not found');
                return undefined;
                }
    
            } catch (error: any) {
                return undefined;
            }
            }


}