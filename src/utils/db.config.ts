import { PrismaClient } from '@prisma/client'

let cachedConnection: PrismaClient | undefined
const log = console.log

export const createDBconnection = () => {
  if (cachedConnection) {
    log('Already Connected!')
    return cachedConnection
  }

  log('Connecting...')

  const connection = new PrismaClient()
  cachedConnection = connection

  return connection
}