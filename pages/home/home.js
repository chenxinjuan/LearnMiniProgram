import homeData from '../../service/homeData'
const TOP_DISTANCE=1000;
Page({
  data: {
    homeBanner:[],//轮播图数据
    homeRecommend:[],//首页推荐列表数据
    headUrl:'../',
    titles:['流行','新款','精选'],
    goods:{
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:0,list:[]}
    },
    currentIndex:'pop',//定义导航栏列表索引
    isScroll:false,//判断是否滚到最底部
    isTabFixed:false,//判断是否固定导航栏
    tabScrollTop:0//定义滑到顶部
  },
  onLoad: function (options) {
    this._getHomeBannerData();//获取轮播及推荐列表数据
    this._getHomeCategoryData('pop');//获取列表各项数据
    this._getHomeCategoryData('new');
    this._getHomeCategoryData('sell');
  },
  onShow(){
     setTimeout(() => {
       wx.createSelectorQuery().select("#tab-fixed").boundingClientRect(rect=>{
         console.log(rect);
         this.data.tabScrollTop=rect.top;
       }).exec()
     }, 1000);
  },
  //监听下拉加载更多
  onReachBottom:function(){
  },
  //监听页面滚动位置
  onPageScroll(options){
    const scrollTop=options.scrollTop;
    const flag1=scrollTop>=TOP_DISTANCE;
    if(flag1!=this.data.isScroll){
      this.setData({
        isScroll:flag1
      })
    }
    const flag2=scrollTop>=this.data.tabScrollTop;
    if(flag2!=this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }
    
  },
  //-------------------数据加载------------------------------------
  _getHomeBannerData(){
    const homeBanner=homeData.homeBannerList;
    const homeRecommend=homeData.homeRecommendList;
    this.setData({
      homeBanner,
      homeRecommend
    })
  },
  _getHomeCategoryData(type){
    const homeCategory=homeData.homeCategoryList;
    const oldList=this.data.goods[type].list;
    oldList.push(...homeCategory[type]);
    const typeKey=`goods.${type}.list`;//定义
    this.setData({
      [typeKey]:oldList
    })
  },
 
  //-------------------事件监听  ------------------------------------
  tabbarClick(event){
    const index=event.detail.index;
    switch(index){
      case 0:
        this.data.currentIndex='pop';
        break;
      case 1:
        this.data.currentIndex='new';
        break;
      case 2:
        this.data.currentIndex='sell';
        break;
    }
    this.setData({
      currentIndex:this.data.currentIndex
    })
  }
})