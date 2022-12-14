import db from '@begin/data'
import arc  from '@architect/functions'
export async function get (req){
  const magicVerifyId = req.query.magic
  const sessionInfo = await db.get({ table: 'session', key: magicVerifyId })
  if (sessionInfo) {
    await db.set({ table: 'session', ...sessionInfo, key: sessionInfo.magicId, verified: true })
  }
  try {
    const connectionId = (await db.get({ table: 'session', key: sessionInfo.magicQueryId })).connectionId
    await arc.ws.send({ id: connectionId, payload: { verified: true } })
  }
  catch (e) {
    console.log(e)
  }
  return {
  }
}
