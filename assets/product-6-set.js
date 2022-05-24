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
 //   console.log(variant_title);
//   target.innerHTML = product_title;
//   target.innerHTML += " 定期便 " + variant_title;
//   if (variant_title == '継続コース 6品セット（幼児18食相当）' || variant_title == '継続コース 8品セット（幼児24食相当）' ){
  //   target = document.getElementsByClassName('product__price-per_meal')[0];
  //   target.innerHTML = '1食あたり277円';
  //   target = document.getElementsByClassName('c-price_off')[0];
  //   target.innerHTML = '単品購入より5%OFF';

//        if (variant_title == '6品セット（18食分〜目安）'){
//          location.href = 'https://homeal.co.jp/products/product-6-set?variant=35826764546216'
//        }else{
//          location.href = 'https://homeal.co.jp/products/product-6-set?variant=35826764578984'
//        }
     
//    }else if( variant_title == '継続コース 10品セット（幼児30食相当）' ){
//      target = document.getElementsByClassName('product__price-per_meal')[0];
//      target.innerHTML = '1食あたり276円';
//      target = document.getElementsByClassName('c-price_off')[0];
//      target.innerHTML = '単品購入より6%OFF';
//        location.href = 'https://homeal.co.jp/products/product-6-set?variant=35826764611752'
//    }
  let sales_previous_price_without_tax  = document.getElementsByClassName('js-sales_previous_price_without_tax')[0];
  let sales_discounted_price_without_tax  = document.getElementsByClassName('js-sales_discounted_price_without_tax')[0];   
  let target_tax_included=document.getElementById("product_tax_included")
//     console.debug(target_tax_included)
   if(variant_title == '継続コース 6品セット（幼児18食相当）'){
     sales_previous_price_without_tax.innerHTML="¥5,539"
     sales_discounted_price_without_tax.innerHTML="¥5,259"      

   }else if(variant_title == '継続コース 8品セット（幼児24食相当）'){
     sales_previous_price_without_tax.innerHTML="¥7,385"
     sales_discounted_price_without_tax.innerHTML="¥7,009"

   }else if(variant_title == '継続コース 10品セット（幼児30食相当）'){
     sales_previous_price_without_tax.innerHTML="¥9,231"
     sales_discounted_price_without_tax.innerHTML="¥8,759"
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

  