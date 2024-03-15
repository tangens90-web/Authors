import axios from 'axios'

let url = "https://jsonplaceholder.typicode.com/posts"





export default class Posts{
    static getPosts(){
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











