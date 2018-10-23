$(function () {
  
})

var bgArr = ['/img/bg.jpg', '/img/bg2.jpg'];
var nowBgIndex = 0;

// 切换背景
$(document).on('click', '.btn-checkbg', function () {
  if (nowBgIndex + 1 >=  bgArr.length) {
    nowBgIndex = -1;
  }
  $('.content-body').css('backgroundImage', 'url(' + bgArr[++nowBgIndex] + ')');
})

$(document).on('click', '.form-check-item', function () {
  $('.form-check-item').removeClass('active');
  $(this).addClass('active');
})

$(document).on('click', '.peo-data-item.add', function () {
  $('#data-item-box').append('<div class="data-item req-data-item">\
  <input class="data-item-input req-data-key" type="text" placeholder="key">\
  <span>:</span>\
  <input class="data-item-input req-data-val" type="text" placeholder="value">\
  <div class="peo-data-item del">-</div>');
})

$(document).on('click', '.peo-data-item.del', function () {
  $(this).parents('.data-item').remove();
})

$(document).on('click', '.btn-request', function () {
  var url = $('#urlInput').val();
  var type = $('.form-check-item.active').data('type');
  var data = {};
  $('.req-data-item').each(function () {
    var _this = $(this);
    var dataKey = _this.find('.req-data-key').val();
    var dataVal = _this.find('.req-data-val').val();
    data[dataKey] = dataVal;
  })
  ajaxReq(url, type, data);
})

function ajaxReq (url, type, data) {
  if (type == 'POST') {
    data = JSON.stringify(data);
  }
  $.ajax({
    url: url,
    type: type,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: data,
    success: function (res) {
      $('.res-con').html(JSON.stringify(res));
    }
  })
}