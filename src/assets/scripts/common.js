const mixins = {
    methods: {
        hello() {
          console.log('hello from mixin!')
        },
        setNumberWithComma(num){
            // console.log('num'+num);
            return num?.toLocaleString();
          }
      }
}

export default mixins;