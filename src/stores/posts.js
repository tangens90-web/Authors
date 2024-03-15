
import { defineStore } from 'pinia'
import Posts from "@/axios/posts"
import Users from "@/axios/users"

export const usePostsStore = defineStore('posts',  {
  state:()=>({
    posts:[],
    users:[],
    
  }),

  getters:{
    postsWithAuthors(){
      
      return this.posts.map((post) => ({
        ...post,
        authorName: this.getUserName(post)
        
        
      }));
      
    },
   
  },
  actions: {
    async getPosts(){
      let data = await Posts.getPosts()
      this.posts = data
      
     
  },
  async getUsers(){
    let data = await Users.getUsers()
    this.users = data
   
   
},
  getUserName(post){
   
    const user = this.users.find((user) => user.id === post.userId);
    
    return user ? user.name :'Неизвестный автор';
  },
  
  }

  
  
})

