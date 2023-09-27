import axios from "axios"
const baseurl = "http://192.168.190.52:3000/users"


export const getUsers = () => {
    const headers = {
        "Content-Type": "application/json"
    };
    return axios
      .get(
        baseurl,
        {headers: headers},
      )
      .then(response => {
        return response.data.reverse();
      })
      .catch(error => {
        console.log("server error",error);
      });
  };

  export const postUser = (data) => {
    const headers = {
        "Content-Type": "application/json"
    };
    return axios
      .post(
        baseurl,
        data,
        {headers: headers},
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log("server error",error);
      });
  };


  export const editUser = (data, id) => {
    const headers = {
        "Content-Type": "application/json"
    };
    return axios
      .put(
        baseurl + '/' + id,
        data,
        {headers: headers},
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log("server error",error);
      });
  };

  export const removeUser = (id) => {
    const headers = {
        "Content-Type": "application/json"
    };
    return axios
      .delete(
        baseurl + '/' + id,
        {headers: headers},
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log("server error",error);
      });
  };