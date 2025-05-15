import styles from "./Project.module.css"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { API_BASE_URL } from "../../config"

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(true)
  const [newService, setNewService] = useState({})

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then((data) => {
        setProject(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setProject(prevProject => ({
      ...prevProject,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch(`${API_BASE_URL}/projects/${project.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(resp => resp.json())
      .then((data) => {
        setProject(data)
        alert("Projeto atualizado com sucesso!")
      })
      .catch((err) => console.log(err))
  }

  function handleServiceChange(e) {
    const { name, value } = e.target
    setNewService(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function addService(e) {
    e.preventDefault()

    const updatedServices = [...(project.services || []), newService]
    const updatedProject = {
      ...project,
      services: updatedServices
    }

    fetch(`${API_BASE_URL}/projects/${project.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    })
      .then(resp => resp.json())
      .then((data) => {
        setProject(data)
        setNewService({})
      })
      .catch((err) => console.log(err))
  }

  function removeService(indexToRemove) {
    const updatedServices = project.services.filter((_, index) => index !== indexToRemove)
    const updatedProject = {
      ...project,
      services: updatedServices
    }

    fetch(`${API_BASE_URL}/projects/${project.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    })
      .then(resp => resp.json())
      .then((data) => {
        setProject(data)
      })
      .catch((err) => console.log(err))
  }

  if (loading) {
    return <p>Carregando projeto...</p>
  }

  return (
    <div className={styles.project_container}>
      <h1>Editar Projeto: {project.name}</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_group}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name="name"
            value={project.name || ''}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="budget">Orçamento:</label>
          <input
            type="number"
            name="budget"
            value={project.budget || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.btn}>Salvar</button>
      </form>

      <h2>Serviços</h2>

      {project.services && project.services.length > 0 ? (
        project.services.map((service, index) => (
          <div key={index} className={styles.service_card}>
            <h3>{service.name}</h3>
            <p><strong>Custo:</strong> R$ {service.cost}</p>
            <p><strong>Descrição:</strong> {service.description}</p>
            <button
              onClick={() => removeService(index)}
              className={styles.btn_remove}
            >
              Remover
            </button>
          </div>
        ))
      ) : (
        <p>Nenhum serviço cadastrado ainda.</p>
      )}

      <h2>Adicionar novo serviço</h2>

      <form onSubmit={addService} className={styles.form}>
        <div className={styles.form_group}>
          <label>Nome do serviço:</label>
          <input
            type="text"
            name="name"
            value={newService.name || ''}
            onChange={handleServiceChange}
          />
        </div>

        <div className={styles.form_group}>
          <label>Custo:</label>
          <input
            type="number"
            name="cost"
            value={newService.cost || ''}
            onChange={handleServiceChange}
          />
        </div>

        <div className={styles.form_group}>
          <label>Descrição:</label>
          <input
            type="text"
            name="description"
            value={newService.description || ''}
            onChange={handleServiceChange}
          />
        </div>

        <button type="submit" className={styles.btn}>Adicionar Serviço</button>
      </form>
    </div>
  )
}

export default Project
