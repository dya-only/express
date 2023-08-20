import { hash, compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { createDBconnection } from '../../utils/db.config'
import { UserDto } from '../../dto/user.dto'
import { User } from '../../entities/user.entity'

const prisma = createDBconnection()

const create = async (user: UserDto) => {
  const { id }: UserDto = user
  const _password = (await hash(user.password, 10)).toString()

  if (await prisma.user.findUnique({ where: { id } })) return { status: 401, type: 'EXISTED' }

  const createQry = await prisma.user.create({
    data: { id, password: _password }
  })

  return { status: 200, message: createQry }
}

const login = async (user: UserDto) => {
  const { id: _id, password: _password }: UserDto = user

  const findQry = await prisma.user.findUnique({ where: { id: _id } })

  if (!findQry) return { status: 401, type: 'NOTFOUND' }

  const { idx, id, password }: User = findQry

  if (!await compare(_password, password)) return { status: 401, type: 'INVALID' }

  const token = sign({ idx, id }, 'token_key', { expiresIn: '3d' })
  return { status: 200, token }
}

const take = async (range: number) => {  
  return { status: 200, qry: await prisma.user.findMany({ take: range }) }
}

export { create, login, take }