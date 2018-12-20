// pages/posts/posts.js
var postsDatas = require('../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  
  
    this.setData(
      {
        postList:postsDatas.postList
      }
      
    );
  },
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid;
    // console.log(event);
     console.log(postId);
    wx.navigateTo({
      url:"post-detail/post-detail?id=" + postId
    })

  },
  onSwiperTap:function(event){
    var postId = event.target.dataset.postid;
    // console.log(event);
    console.log(postId);
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  }


  
})