(function () {
var nativeSetTimeout = window.setTimeout;

window.bindTimeout = function (listener, interval) {

    function setTimeout(code, delay) {
        var elapsed = 0,
            h;

        h = window.setInterval(function () {
                elapsed += interval;
                if (elapsed < delay) {
                    listener(delay - elapsed);
                } else {
                    window.clearInterval(h);
                }
            }, interval);
        return nativeSetTimeout(code, delay);
    }

    window.setTimeout = setTimeout;
    setTimeout._native = nativeSetTimeout;
};
}());

function whowin(pc, user){
  if(pc == user){
    return 0;
  }

  if(pc == 'scissor' && user == 'stone'){
    return -1;
  }

  if(pc == 'paper' && user == 'scissor'){
    return -1;
  }

  if(pc == 'stone' && user == 'paper'){
    return -1;
  }
  return 1;
}

function game(){
  var score = 0;
  var option = ['scissor', 'paper', 'stone'];
  var pc_select = 0;
  var is_start = true;

  pc_select = Math.floor(Math.random()*option.length);
  $('#pc_img').attr('src', 'img/'+option[pc_select]+'.png');
  window.bindTimeout(function (t) {$('#second').text((t/1000).toFixed(1))}, 100);
  var countdown = window.setTimeout(function () {swal({title: '遊戲結束',
                                                       html: '<h3>得分</h3>' + '<span style="font-size: 20px; font-weight: bold; text-decoration: underline;">'+score+'</span>',
                                                       confirmButtonColor: '#d33',
                                                       confirmButtonText: '重新開始'
}).then(function(){location.reload();})} , 5000);

  $('#scissor, #paper, #stone').click(function(){
    //Clear timer
    clearTimeout(countdown);
    for (var i = 1; i < 99999; i++){
      window.clearInterval(i);
    }

    if(whowin(option[pc_select], $(this).attr('id')) == 1){
      score = score + parseFloat($('#second').text()) * 10;
      $('#msg').text('玩家獲勝');
    }else if(whowin(option[pc_select], $(this).attr('id')) == -1){
      $('#msg').text('電腦獲勝');
    }
    else{
      $('#msg').text('平手');
    }

    $('#score').text(score);

    pc_select = Math.floor(Math.random()*option.length);
    $('#pc_img').attr('src', 'img/'+option[pc_select]+'.png');
    window.bindTimeout(function (t) {$('#second').text((t/1000).toFixed(1))}, 100);
    var countdown = window.setTimeout(function () {swal({title: '遊戲結束',
                                                           html: '<h3>得分</h3>' + '<span style="font-size: 20px; font-weight: bold; text-decoration: underline;">'+score+'</span>',
                                                           confirmButtonColor: '#d33',
                                                           confirmButtonText: '重新開始'
    }).then(function(){location.reload();})} , 5000);
  });

}



swal({
  title: '遊戲說明',
  type: 'info',
  html:'本遊戲與一般猜拳相反<br>'+
       '獲勝條件為『出相反的拳』才能獲勝<br><br>'+
       '<strong>例子</strong><br>電腦出『剪刀』而玩家出『石頭』，這樣為電腦獲勝。<br><br>'+
       '<strong>得分</strong><br>為每局剩餘時間乘 10',
  confirmButtonText: '開始遊戲'
}).then(function(){game();});

