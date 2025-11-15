const express = require('express')
const cors = require('cors')
const { bcvDolar, dtDolar } = require('./src')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    message: 'BCV Divisas API',
    endpoints: {
      bcv: '/api/bcv',
      dt: '/api/dt'
    }
  })
})

app.get('/api/bcv', async (req, res) => {
  try {
    const data = await bcvDolar()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error obteniendo datos del BCV' })
  }
})

app.get('/api/dt', async (req, res) => {
  try {
    const data = await dtDolar()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error obteniendo datos de DolarToday' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`BCV Divisas API escuchando en puerto ${PORT}`)
})
