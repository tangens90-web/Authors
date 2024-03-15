import axios from 'axios'

let url = "https://jsonplaceholder.typicode.com/users"





export default class Users{
    static getUsers(){
         return new Promise ((resolve,reject )=>{
                  axios.get(`${url}`).then(
                     res=> {
                         const data = res.data
                         resolve(data)
                }).catch(error=>{
                    reject(error)
                })
            })
        
    }
}