import router from "./index"

router.beforeEach((to,from,next)=>{
    console.log(to,from,next);
})

router.afterEach(transition =>{
    console.log(transition);
})