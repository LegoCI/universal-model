import _ from 'lodash'

export function pack(data, info) {
  const pack = {
    code: info.code,
    message: info.message,
  }
  if (Array.isArray(data)) return this.json(data)
  if (data) {
    if (data.__pack) {
      Object.assign(pack, _.omit(data, ['__pack']))
    }
    else {
      Object.assign(pack, _.omit(data, ['__pack']))
    }
  }
  if(__DEV__ && info.err){
    pack.err = info.err
  }
  return this.json(pack)
}

export function ok(data){
  const info = {
    code: 0,
    message: 'ok'
  }
  return this.pack(data, info);
}

export function err(err){
  if (!err) {
    err = {
      code: 1,
      message: 'Неизвестная ошибка'
    }
  }
  if (!err.code) {
    err.code = 1
  }
  if (this.statusCode < 400){
    this.status(500)
  }
  return this.pack(null, err);

}
