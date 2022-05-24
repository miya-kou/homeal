function updateChoice(frequencyNum = 4){
    let elements = document.getElementsByClassName('bold-ro__order-interval');
    for(let i = 0; i < elements.length; i++){
      let options = elements[i].options;
  //     デフォルト値を "配送頻度 4 週に1回" に変更
      options[frequencyNum-1].selected = true ;   
    }
    elements = document.getElementsByClassName('bold-ro__frequency-num');
    for(let i = 0; i < elements.length; i++){
      elements[i].value = frequencyNum;
    }
}

$(function() {
    $(document).ready( function(){    
     setTimeout(() => {
          updateChoice()
        }
          ,200
        )
    });
    
    $('.variant-input').on('click', function() {
     let variant_title = $(this)[0].dataset.value;
  //     console.log(variant_title);
     let target = document.getElementsByClassName('h2 product-single__title')[0];
     target.innerHTML = product_title;
     target.innerHTML += " 定期便 " + variant_title;
     if (variant_title == '6品セット（18食分〜目安）' || variant_title == '8品セット（24食分〜目安）' ){
       target = document.getElementsByClassName('product__price-per_meal')[0];
       target.innerHTML = '1食あたり277円';
       target = document.getElementsByClassName('c-price_off')[0];
       target.innerHTML = '単品購入より5%OFF';
//        if (variant_title == '6品セット（18食分〜目安）'){
//          location.href = 'https://homeal.co.jp/products/product-6-set?variant=35826764546216'
//        }else{
//          location.href = 'https://homeal.co.jp/products/product-6-set?variant=35826764578984'
//        }
       
     }else if( variant_title == '10品セット（30食分〜目安）' ){
       target = document.getElementsByClassName('product__price-per_meal')[0];
       target.innerHTML = '1食あたり276円';
       target = document.getElementsByClassName('c-price_off')[0];
       target.innerHTML = '単品購入より6%OFF';
//        location.href = 'https://homeal.co.jp/products/product-6-set?variant=35826764611752'
     }
      let frequencyNum;
      elements = document.getElementsByClassName('bold-ro__frequency-num');
      for(let i = 0; i < elements.length; i++){
        frequencyNum = elements[i].value;
      }
      
      setTimeout(() => {
          updateChoice(frequencyNum)
    },200)
    
    });

  });
  
  