import type { Videojuego } from "../pages/CRUDVideojuegosPage"

interface MainProps {
    videojuegos : Videojuego[]
    onOpenModal : () => void
    onEditVideojuego : (id : string) => void
    onDeleteVideojuego : (id : string) => void
}

const Main = (props : MainProps) => {
    return <div>
        <button type="button" className="btn btn-primary mb-3"
            onClick={ props.onOpenModal }>
            Añadir Videojuego
        </button>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Plataformas</th>
                    <th>Fecha de Estreno</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.videojuegos.map( (vj : Videojuego) => {
                        return <tr key={vj.id}>
                            <td>{ vj.nombre }</td>
                            <td>{ vj.categoria }</td>
                            <td>{ vj.plataformas.join(",") }</td>
                            <td>{ vj.fecha }</td>
                            <td>{ vj.estado }</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-1"
                                    onClick={ () => { props.onEditVideojuego(vj.id) } }>
                                        Editar
                                </button>
                                <button className="btn btn-danger btn-sm"
                                    onClick={ () => { props.onDeleteVideojuego(vj.id)} }>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    } )
                }
            </tbody>
        </table>
    </div>
}

export default Main