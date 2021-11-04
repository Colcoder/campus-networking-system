const fetchAllDeans = () => {
  return fetch(`/api/deans`, {
    method: "GET",
  }).then((_response) => {
    return _response.json();
  });
};

const editAlumniDetails = (_user) => {
  return fetch(`/api/alumni/${_user.username}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(_user),
  }).then((_response) => {
    return _response.json();
  });
};

const deleteAlumniAccount = (_user) => {
  return fetch(`/api/alumni/${_user.username}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then((_response) => {
    return _response.json();
  });
};

const registerAccount = (_user) => {
  return fetch(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_user),
  }).then((_response) => {
    return _response.json();
  });
};
