var postsDatas = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data:{
    isPlayingMusic:false


  },
  onLoad: function(option) {
    var globalData = app.globalData;
    var postId = option.id;
    this.data.currentPostId = postId;
    // console.log(postId)
    var postData = postsDatas.postList[postId];
    // console.log(postData)
    // 如果在onload方法中，不是异步的去执行一个数据绑定
    // 则不需要使用this.setData方法
    // 只需要对this.data赋值即可实现
    // this.data.postData = postData;
    this.setData({
      postData: postData
    })
    // wx.setStorageSync('key',{
    //   game: "风暴英雄",
    //   developer: "暴雪"
    // })
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var collected = postsCollected[postId]
      if (postsCollected) {
        this.setData({
          collected: postsCollected
        })
      }

    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic:true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });

  },
  onColletionTap: function(event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    console.log(postsCollected);
    var postCollected = postsCollected[this.data.currentPostId];
    console.log(postCollected);
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId]=postCollected;
    this.showModal(postsCollected,postCollected);
  },
  showModal: function(postsCollected,postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: postCollected?"收藏该文章？":"取消收藏该文章？",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync("posts_collected", postsCollected);
          // // 更新数据绑定变量，从而实现切换
          that.setData({
            collected: postCollected
          })
        }
      }

    })
  },
  // showToast: function(postCollected,postsCollected) {

  //   wx.setStorageSync("posts_collected", postsCollected);
  //   // // 更新数据绑定变量，从而实现切换
  //   this.setData({
  //     collected: postCollected
  //   })
  //   wx.showToast({
  //     title: postCollected ? "收藏成功" : "取消成功",
  //     duration: 1000,
  //     icon: "success",
  //   })
    
  // }
  onShareTap:function(event){
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
      wx.showActionSheet({
      
        itemList:itemList,
        itemColor:"#405f80",
        success:function(res){
          // res.cancel 用户是否点击了取消按钮
          // res.tapIndex 数组中的序号，从0开始
          wx.showModal({
            title:"用户"+itemList[res.tapIndex],
            content:"用户会否取消？"+res.cancel+"现在无法实现分享功能，什么时候可以实现嘞？"
          })
        }
      })
  },
  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var postData = postsDatas.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      // this.data.isPlayingMusic = false;
      this.setData({
        isPlayingMusic:false
      })
    }
    else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      // this.data.isPlayingMusic = true;
      this.setData({
        isPlayingMusic: true
      })

    }
    
  

  }


})