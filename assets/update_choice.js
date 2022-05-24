$(function() {
  $(document).ready( function(){    
    let elements = document.getElementsByClassName('bold-ro__order-interval');
    for(let i = 0; i < elements.length; i++){
      let options = elements[i].options;
  //     デフォルト値を "配送頻度 4 週に1回" に変更
      options[3].selected = true ;   
    }
  });
});