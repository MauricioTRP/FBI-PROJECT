import jwt from 'jsonwebtoken'

/**
 * headers { "Authorization": "Bearer <token>" }
 */
export const Authorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    next() /** Una vez verificado pasa a la ruta correspondiente */
  } catch (error) {
    res.status(401).json({
      html: 'No autorizado'
    })
  }
}