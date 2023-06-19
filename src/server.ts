import mongoose from 'mongoose'
import config from './config'
import app from './app'

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`database connected succsfully`)
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('failed to connected', error)
  }
}
boostrap()
