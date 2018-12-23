// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    movies:{},
    navigateTitle: "",
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },

  onLoad: function(options) {
    var dataUrl;
    var category = options.category;
    this.data.navigateTitle = category;
    //  console.log(category);
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +"/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
     }
    //  console.log();
    this.data.requestUrl=dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },
  onScrollLower:function(event){
    // console.log("加载更多")
    var nextUrl = this.data.requestUrl +"?start="+this.data.totalCount+"&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh:function(event){
    var refreshUrl = this.data.requestUrl+"?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    util.http(refreshUrl,this.processDoubanData);
    wx.showNavigationBarLoading();

  },
  processDoubanData: function (moviesDouban){
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      };
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),

        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies={};
    // 如果想要加载旧的数组，那么需要和新的数组加载在一起。
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty=false;
    }
    this.setData({
      movies:totalMovies
    });
    this.data.totalCount = +20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onReady: function(event) {
    // 该属性只可以在onready中使用
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})