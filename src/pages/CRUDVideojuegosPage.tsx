import { useEffect, useState } from "react"
import Header from "../components/Header"
import Main from "../components/Main"
import ModalVideojuegos from "../components/ModalVideojuegos"

import "./CRUDVideojuegosPage.css"

export interface Videojuego {
    id : number
    nombre : string
    categoria : string
    plataformas : string[]
    fecha : string
    estado : string
}

const data : Videojuego[] = [
    {
        id: 1,
        nombre: "Ecos de la Ciudad",
        categoria: "Aventura",
        plataformas: ["PC", "PS5"],
        fecha: "2024-03-15",
        estado: "Nuevo"
    },
    {
        id: 2,
        nombre: "Furia Galáctica",
        categoria: "Shooter",
        plataformas: ["PC", "Xbox Series X", "Switch"],
        fecha: "2023-11-02",
        estado: "Usado"
    },
    {
        id: 3,
        nombre: "Leyenda del Bosque",
        categoria: "Rol",
        plataformas: ["PC"],
        fecha: "2025-01-20",
        estado: "Nuevo"
    },
    {
        id: 4,
        nombre: "Rally Extremo",
        categoria: "Carreras",
        plataformas: ["PS5", "Xbox Series X"],
        fecha: "2022-09-10",
        estado: "Digital"
    },
    {
        id: 5,
        nombre: "Puzzle: Conexiones",
        categoria: "Puzzle",
        plataformas: ["Mobile", "PC"],
        fecha: "2024-07-01",
        estado: "Nuevo"
    },
    {
        id: 6,
        nombre: "Cazadores Nocturnos",
        categoria: "Horror",
        plataformas: ["PC", "PS5"],
        fecha: "2021-10-31",
        estado: "Usado"
    }
]

const CRUDVideojuegosPage = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [listaVideojuegos, setListaVideojuegos] = useState<Videojuego[]>([])
    const [flagRecarga, setFlagRecarga] = useState<boolean>(false)
    const [idVideojuegoAEditar, setIdVideojuegoAEditar] = useState<number|undefined>(undefined)

    const httpObtenerVideojuegos = async () => {
        const resp = await fetch("http://localhost:5002/videojuegos")
        const data = await resp.json()
        setListaVideojuegos(data)
    }

    const httpEliminarVideojuego = async (id: number) => {
        const resp = await fetch(`http://localhost:5002/videojuegos/eliminar?id=${id}`)
        if (resp.status == 200) {
            setFlagRecarga(!flagRecarga)
        }
    }

    const httpCrearVideojuego = async (vj : Videojuego) => {
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
    const editVideojuego = (id : number) => {
        //.. Cargar la data del videojuego
        console.log(id)
        setIdVideojuegoAEditar(id)
        setShowModal(true)
    }

    const deleteVideojuego = (id : number) => {
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
            idVideojuego={ idVideojuegoAEditar }/>
    </div>
}

export default CRUDVideojuegosPage