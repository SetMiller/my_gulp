import del from 'del'

export const t_clean_dev = () => {
  return del(app.path.clean_dev)
}
export const t_clean_prod = () => {
  return del(app.path.clean_prod)
}