import { axiosInstanse } from "./axiosInstanse";

export type SomeStrangeType = {token: string, image: string}

export const register  = async (props:SomeStrangeType): Promise<SomeStrangeType> => {
  await axiosInstanse.post('/internal/login', { token: props.token }); 
  return props
}