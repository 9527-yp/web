import { defineStore } from "pinia";

// defineStore方法执行会返回一个函数，函数的作用就是让组件可以获取到仓库数据
const globalStore = defineStore("global", {
    // 存储数据state
    state: (): any => {
      return {
        // 是否折叠菜单
        isCollapse: false,
        // 菜单默认宽度
        menuWidth: 220,
      };
    },
    // 该函数没有上下文数据，所以获取state中的变量需要使用this
    actions: {
      // Set Token
      setCollapse(value: boolean) {
        this.isCollapse = !value;
        return this.isCollapse
      }
    },
    // 计算属性，和vuex是使用一样，getters里面不是方法，是计算返回的结果值
    getters: {}
  });
  
  // 对外暴露方法
  export default globalStore;