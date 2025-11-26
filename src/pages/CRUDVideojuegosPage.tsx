import { useEffect, useState } from "react"
import Header from "../components/Header"
import Main from "../components/Main"
import ModalVideojuegos from "../components/ModalVideojuegos"

import "./CRUDVideojuegosPage.css"

export interface Videojuego {
    id? : string
    nombre : string
    categoria? : string
    categoria_id? : string
    plataformas? : string[]
    fecha? : string
    estado : string
}

export interface Categoria {
    id : string
    nombre : string
}

export interface Plataforma {
    id : string
    nombre : string
}

const CRUDVideojuegosPage = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [listaVideojuegos, setListaVideojuegos] = useState<Videojuego[]>([])
    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([])
    const [listaPlataformas, setListaPlataformas] = useState<Plataforma[]>([])
    const [flagRecarga, setFlagRecarga] = useState<boolean>(false)
    const [idVideojuegoAEditar, setIdVideojuegoAEditar] = useState<string|undefined>(undefined)

    const httpObtenerVideojuegos = async () => {
        const resp = await fetch("http://localhost:5002/videojuegos")
        const data = await resp.json()
        setListaVideojuegos(data)
    }

    const httpObtenerCategorias = async () => {
        const resp = await fetch("http://localhost:5002/categorias")
        const data = await resp.json()
        setListaCategorias(data)
    }

    const httpObtenerPlataformas = async () => {
        const resp = await fetch("http://localhost:5002/plataformas")
        const data = await resp.json()
        setListaPlataformas(data)
    }

    const httpEliminarVideojuego = async (id: string) => {
        const resp = await fetch(`http://localhost:5002/videojuegos/eliminar?id=${id}`)
        if (resp.status == 200) {
            setFlagRecarga(!flagRecarga)
        }
    }

    const httpCrearVideojuego = async (vj : Videojuego) => {
        vj.plataformas = undefined
        vj.id = undefined
        vj.fecha = undefined
        const resp = await fetch("http://localhost:5002/videojuegos/crear", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(vj)
        })
        if (resp.status == 200) {
            console.log("se guardo en backend")
            setShowModal(false)
            setFlagRecarga(!flagRecarga)
        }
    }

    const httpUpdateVideojuego = async (vj : Videojuego) => {
        const resp = await fetch("http://localhost:5002/videojuegos/actualizar", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(vj)
        })
        if (resp.status == 200) {
            console.log("se guardo en backend")
            setShowModal(false)
            setFlagRecarga(!flagRecarga)
        }
    }

    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
        setIdVideojuegoAEditar(undefined)
    }
    const editVideojuego = (id : string) => {
        //.. Cargar la data del videojuego
        console.log(id)
        setIdVideojuegoAEditar(id)
        setShowModal(true)
    }

    const deleteVideojuego = (id : string) => {
        console.log(`Se eliminar videojuego con ${id}`)
        httpEliminarVideojuego(id)
    }
    const updateVideojuego = (vj : Videojuego) => {
        console.log(`Se creara videojuego. ${vj.nombre}`)
        httpUpdateVideojuego(vj)
    }

    const createVideojuego = (vj : Videojuego) => {
        httpCrearVideojuego(vj)
    }

    useEffect( () => {
        httpObtenerVideojuegos()
        httpObtenerCategorias()
        httpObtenerPlataformas()
    }, [flagRecarga] )


    return <div>
        <div className="container mt-5">
            <Header />
            <Main videojuegos={ listaVideojuegos } 
                onOpenModal={ openModal }
                onEditVideojuego={ editVideojuego }
                onDeleteVideojuego={ deleteVideojuego}/>
        </div>
        <ModalVideojuegos showModal={ showModal } 
            onCloseModal={ closeModal }
            onCreateVideojuego={ createVideojuego }
            onUpdateVideojuego={ updateVideojuego }
            idVideojuego={ idVideojuegoAEditar }
            categorias={listaCategorias}
            plataformas={listaPlataformas} />
    </div>
}

export default CRUDVideojuegosPage