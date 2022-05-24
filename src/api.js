const API_URL='https://api2.myauto.ge/ka/';

export function getProducers() {
  return fetch("http://static.my.ge/myauto/js/mans.json")
    .then((res) => res.json())
    .then((res) => res)
}

export function getModels(id) {
  return fetch(`${API_URL}getManModels?man_id=${id}`)
    .then((res) => res.json())
    .then((res) => res.data)
}

export function getCategories() {
  return fetch(`${API_URL}cats/get`)
    .then((res) => res.json())
    .then((res) => res.data)
}

export function getProducts(filters = {}) {
  let url = `${API_URL}products/?`;
  for(let key in filters) {
    if(filters[key] != null && filters[key] !== '') {
      url += key + '=' + filters[key] + '&';
    }
  }
  url = url.slice(0, -1);

  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
}

