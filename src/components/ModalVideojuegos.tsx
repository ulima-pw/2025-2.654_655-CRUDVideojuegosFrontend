import { Modal } from "react-bootstrap"
import type { Categoria, Plataforma, Videojuego } from "../pages/CRUDVideojuegosPage"
import { useEffect, useState } from "react"

interface ModalVideojuegosProps {
    showModal : boolean
    onCloseModal : () => void
    onCreateVideojuego : (vj : Videojuego) => void
    onUpdateVideojuego :  (vj : Videojuego) => void
    idVideojuego? : string
    categorias : Categoria[]
    plataformas : Plataforma[]
}

const ModalVideojuegos = (props : ModalVideojuegosProps) => {
    const [nombre, setNombre] = useState<string>("")
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("")
    const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState<string[]>([])
    const [fecha, setFecha] = useState<string>("")
    const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("")

    const httpObtenerVideojuego = async (id : string) => {
        const resp = await fetch(`http://localhost:5002/videojuegos/${id}`)
        if (resp.status == 200) {
            const vj = await resp.json()
            setNombre(vj.nombre)
            setCategoriaSeleccionada(vj.categoria)
            setPlataformasSeleccionadas(vj.plataformas)
            setFecha(vj.fecha)
            setEstadoSeleccionado(vj.estado)
        }
    }

    const onNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.currentTarget.value)
    }

    const onFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(e.currentTarget.value)
    }

    const onCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoriaSeleccionada(e.currentTarget.value)
    }

    const onPlataformasSeleccionadasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = e.currentTarget.options

        const plataformas = []
        for(let i =0; i < options.length; i++) {
            if (options[i].selected) {
                plataformas.push(options[i].value)
            }
        }
        setPlataformasSeleccionadas(plataformas)

        //console.log(e.currentTarget.value)
    }

    const onEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEstadoSeleccionado(e.currentTarget.value)
    }

    useEffect(() => {
        if (props.idVideojuego != undefined) {
            httpObtenerVideojuego(props.idVideojuego )
        }
    }, [props.idVideojuego])


    return <Modal show={props.showModal} onHide={ props.onCloseModal }>
        <Modal.Header>
            <h5 className="modal-title" id="gameModalLabel">Añadir/Editar Videojuego</h5>
            <button type="button" className="btn-close"
                onClick={ props.onCloseModal }></button>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" 
                        value={ nombre }
                        onChange={ onNombreChange }
                        required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <select className="form-select" id="categoria" 
                        value={ categoriaSeleccionada }
                        onChange={ onCategoriaChange }
                        required>
                        <option value="">Seleccione una categoría</option>
                        {
                            props.categorias.map((cat) => {
                                return <option value={cat.id}>{ cat.nombre }</option>
                            })
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="plataformas" className="form-label">Plataformas</label>
                    <select className="form-select" id="plataformas" multiple 
                        value={ plataformasSeleccionadas }
                        onChange={ onPlataformasSeleccionadasChange }
                        required>
                        {
                            props.plataformas.map((p)=>{
                                return <option value={p.id}>{ p.nombre }</option>
                            })
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaEstreno" className="form-label">Fecha de Estreno</label>
                    <input type="date" className="form-control" id="fechaEstreno" 
                        value={ fecha }
                        onChange={ onFechaChange }
                        required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select className="form-select" id="estado" 
                        value={estadoSeleccionado}
                        onChange={ onEstadoChange }
                        required>
                        <option value="">Seleccione un estado</option>
                        <option value={"Nuevo"}>Nuevo</option>
                        <option value={"Usado"}>Usado</option>
                        <option value={"Digital"}>Digital</option>
                    </select>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <button type="button" className="btn btn-secondary"
                onClick={ props.onCloseModal }>Cerrar</button>
            <button type="button" className="btn btn-primary"
                onClick={ () => {                    
                    const vj : Videojuego = {
                        id : props.idVideojuego == undefined ? "" : props.idVideojuego,
                        nombre : nombre,
                        categoria_id : categoriaSeleccionada,
                        plataformas : plataformasSeleccionadas,
                        fecha : fecha,
                        estado : estadoSeleccionado
                    }
                    if (props.idVideojuego == undefined) {
                        // Caso de Crear
                        props.onCreateVideojuego(vj)
                    }else {
                        // Caso Update
                        props.onUpdateVideojuego(vj)
                    }
                } }>
                Guardar Cambios
            </button>
        </Modal.Footer>
    </Modal>
}

export default ModalVideojuegos