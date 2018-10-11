$(function () {
  
})

$(document).on('click', '.form-check-item', function () {
  $('.form-check-item').removeClass('active');
  $(this).addClass('active');
})

$(document).on('click', '.peo-data-item.add', function () {
  $('#data-item-box').append('<div class="data-item">\
  <input class="data-item-input" type="text" placeholder="key">\
  <span>:</span>\
  <input class="data-item-input" type="text" placeholder="value">\
  <div class="peo-data-item del">-</div>');
})

$(document).on('click', '.peo-data-item.del', function () {
  $(this).parents('.data-item').remove();
})