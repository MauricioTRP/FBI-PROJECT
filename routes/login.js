import { Router } from "express";
import jwt from 'jsonwebtoken'
import { results } from "../data/agentes.js";

/**
 * Validamos credenciales del agente
 * y entregamos JWT firmado en caso de 
 * credenciales correctas
 */

const router = Router() /** instancia del Router */

/**
 * front envía credenciales en body
 * { email: string, password: 'string' }
 */
router.post("/", async (req, res) => {
  const { email, password } = req.body

  /** Verificamos que existe el agente y sus credenciales son correctas */
  const esAgente = results.some(agente => agente.email == email && agente.password == password)

  const secreto = process.env.JWT_SECRET

  if (esAgente) {
    const token = jwt.sign({email: email}, secreto, { expiresIn: 120 })

    res.json({
      html: `<h1>Bienvenido</h1>
      <h2>${email}</h2>
      <a href="/casos">Ver Casos</a>
      `,
      token: token
    })
  } else {
    res.status(401).send('Usuario no autorizado')
  }
})

export {router}