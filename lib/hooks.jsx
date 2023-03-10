import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => fetch(url).then(r => r.json());


export function useUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data && data.user;
  return [user, { mutate }];
}
export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

/*
const fetcher = (url) => fetch(url).then(r => r.json());
const fetcher = url => axios.get(url).then(res => res.data.json())
*/
