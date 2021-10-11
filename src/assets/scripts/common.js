const mixins = {
    methods: {
        hello() {
          console.log('hello from mixin!')
        },
        $_setNumberWithComma(num){
            // console.log('num'+num);
            return num?.toLocaleString();
          },
        $_isMobile(){
          let width = window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth
          return width <= 768
        },
        $_removeBlank(item){
          return item.replace(/\s*/g, "")
        }

      }
}

export default mixins;