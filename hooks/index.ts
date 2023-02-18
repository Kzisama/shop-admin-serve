import { IRoute } from '../typeings'

export const useGetUserRoutes = (roles: string, allRoutes: IRoute[]) => {
  // 转换为number[]的路由数组
  const rolesArr = roles
    .slice(1, -1)
    .split(',')
    .map((item: string) => parseInt(item))
  // 用户拥有的路由
  const userRoutes = allRoutes.filter((item) => {
    return rolesArr.indexOf(item.routeID) !== -1
  })

  return userRoutes
}
