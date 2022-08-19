export async function fetchDataArr(url, propName) {
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function fetching(url, setState) {
  const data = await fetchDataArr(url);
  console.log(data);
  setState(data);
}
