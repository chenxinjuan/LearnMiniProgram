// components/w-tabbar/w-tabbar.js
Component({
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },
  data: {
     currentIndex:0
  },
  methods: {
    currentIndexClick(event){
      const index=event.currentTarget.dataset.index;
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('tabbarClick',{index:this.properties.currentIndex});
    }
  }
})
