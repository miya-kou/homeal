function applyAllergies(allergies){
	$('.bold-grid__column').children('.bold-product').each(function(index, element){
      console.log(product_meta)
      console.log($(element).attr('data-slot-product-handle'))
      if( getIsDuplicate(allergies, product_meta[$(element).attr('data-slot-product-handle')]['allergies'] ) ){
        $(element).css({'opacity':'0.3'});
        $(element).find('.bold-product__quantity-increase').css('pointer-events', 'none');
        $(element).find('.bold-product__quantity-val').css('pointer-events', 'none');
      }
  })
}


function changeFigSize(){
  let elements = document.getElementsByClassName('bold-pic');
  for (let i = 0; i < elements.length; i++){
    let className = elements[i].className.split(' ')[2];
//     let target = document.getElementsByClassName(className)[0];
//     console.log(target.style.backgroundImage);
    let newURL = $("."+className).css("background-image").replace('500x500', '1500x1500');
//     console.log(newURL);
    $("."+className).css("background-image", newURL);
  }
}

function showRemaining(){
  let remaining = document.getElementsByClassName('bold-ro__choice-progress-value')[0].innerHTML;
//   console.log(remaining);
  $(".p-page__title").children('span').text(remaining+'つ');
}



function addTags(){
  let elements = document.getElementsByClassName('bold-grid__column bold-grid__column--quarter');
    for( let i = 0; i < elements.length; i++){
      let child = elements[i].firstElementChild;
      let handle = child.dataset.slotProductHandle;
      
      let ul=document.createElement('ul');
        ul.classList.add('p-menu_list__tags');
    //     let text = '<ul class="p-menu_list__tags">';

      if (!product_meta[handle]) { continue;}
        for( let tag of product_meta[handle].main_nutrition_tag ){
          let li=document.createElement('li');
          ul.appendChild(li);
          li.innerHTML += tag;
          li.classList.add('p-menu_list__tag');
          li.dataset.type = 'balance'; 
    //       text += '<li class="p-menu_list__tag" data-type="balance">'+ tag +'</li>';
        }
        for( let tag of product_meta[handle].main_lifestyle_tag ){
          let li=document.createElement('li');
          ul.appendChild(li);
          li.innerHTML += tag;
          li.classList.add('p-menu_list__tag');
          li.dataset.type = 'lifestyle'; 
    //       text += '<li class="p-menu_list__tag" data-type="lifestyle">'+ tag +'</li>';
        }
    //     text += '</ul>';
      //   console.log(ul);
        let grandchild = child.children;
        for (let j = 0; j < grandchild.length; j++){
          if ( grandchild[j].className == 'bold-product__details bold-pd' ){
            grandchild[j].insertBefore(ul, grandchild[j].firstChild);
          }
        }
      
    }
  }
  
  function addClassName(mainFood, subFoodHandles){
//     console.log(subFoodHandles);
    let elements = document.getElementsByClassName('bold-grid__column bold-grid__column--quarter');
    for( let i = 0; i < elements.length; i++){
      let child = elements[i].firstElementChild;
      let handle = child.dataset.slotProductHandle;
      if ( handle == mainFood ){
        elements[i].classList.add('bold-product__recommend-most');
        // console.log('main\n' + handle);
      }
      else if ( subFoodHandles.indexOf(handle) >= 0 ){
        elements[i].classList.add('bold-product__recommend');
        // console.log('sub\n' + handle);
      }
    }
  }
  function countDE(param, questions){
    //   引数(questions)に質問番号のリストを与え，それらのうちDまたはEと回答した個数を返す
    let count = 0;
    for(let i = 0; i < questions.length; i++){
        let key = 'q' + questions[i];
        if ( param[key] == '週に１～３回' || param[key] == '週に１回未満' ){
        count += 1;
        }else if (param[key] == '午後１１時以降' || param[key] == '不規則・決まってない' ){
        count += 1;
        }else if (param[key] == 'ややそうである' || param[key] == 'とてもそうである' ){
        count += 1;
        }
    }
    //   console.log(count, questions);
    return count
    }
  function getIsDuplicate(arr1, arr2) {
  return [...arr1, ...arr2].filter(item => arr1.includes(item) && arr2.includes(item)).length > 0
  }
  
  function getAllowedFood(allergies){
  let allowedFood = [];
  for (let key of product_handles) {
    console.log(key)
//       console.log(product_meta[key].allergies);
      if( ! getIsDuplicate(allergies, product_meta[key].allergies ) ){
      allowedFood.push(key);
      }
  } 
  return allowedFood;
  }
  
  function getSubFoodHandles(subFoodNum, allowedFood){
  //   サブ提案商品の番号通りに並べる．シートでは1からスタートなので0番目に空文字を．
  let handles = ['',
  'beef-and-chickpea-hashed-beef', 
  'boneless-cod-and-vegetables-with-chinese-sauce', 
  'meatballs-with-liver-in-tomatoes', 
  'pork-and-broccoli-in-additive-free-cream', 
  'caponata-with-white-beans-and-grilled-eggplant', 
  'tofu-hamburger-steak-with-edamame-and-hijiki', 
  'not-spicy-keema-curry-with-lots-of-hidden-vegetables', 
  'additive-fre-soft-mackerel', 
  'pork-and-beans', 
  'sauce-with-10-kinds-of-vegetables-and-mushrooms',
  'pork-buns-with-no-food-additives', 
  '6-fruit-assortment-set', 
  'rice-flour-pumpkin-cake', 
  'banana-and-soybean-flour-pound-cake', 
  'baby-scallops-and-clams-chowder', 
  'stouffato-with-coarse-ground-italian-pate-and-cabbage', 
  'porcini-and-young-chicken-fricassee',
  'mackerel-in-miso-sauce',
  'mackerel-with-ginger-stew',
  'sprinkle-with-gold-sesame-seeds-of-autumn-salmon',
  'non-spicy-butter-masala-curry-with-chicken-balls',
  'omar-shrimp-bisque-curry',
  'grilled-salmon-chan-chan-yaki',
  'sardine-soboro',
  'moist-boiled-dadacha-beans-and-unohana',
  'japanese-style-soup-of-chicken-and-6-kinds-of-vegetables-with-glutinous-barley',
  'borscht-style-stew-of-beef-with-beets-and-7-vegetables',
  'soy-milk-cream-stew-with-7-kinds-of-vegetables-and-pork',
  'chinese-cabbage-and-minced-meat-with-japanese-sauce',
  'sauteed-pork-and-deep-fried-tofu-with-japanese-bonito',
  'fried-abedori-with-salted-malted-rice',
  'chefs-special-hand-kneaded-hamburger-steak',
  'apple-cinnamon-scones',
  'honey-soy-milk-bread',
  'japanese-wheat-bread',
  'white-beef-stroganoff',
  'japanese-style-meatloaf',
  'bouillabaisse-style-soup',
  'corn-stew',
  'pumpkin-stew',
              ]
  let subFoodHandles = [];
  let otherFoodHandles = [];
  for(let num of subFoodNum){
    //   console.log(num, handles[num]);
      if(allowedFood.indexOf(handles[num]) >= 0 ){
      subFoodHandles.push(handles[num]);
      }
  }
  return subFoodHandles;
  //   return Array.from(new Set(arr1.filter(e => (new Set(arr2).has(e)))));
  }
  
  function getOtherFoodHandles(allowedFood, mainFoodHandle, subFoodHandles){
  let otherFoodHandles = [];
  for(let handle of allowedFood){
      if( handle == mainFoodHandle ){
      continue;
      }else if( subFoodHandles.indexOf(handle) >= 0 ){
      continue;
      }
      otherFoodHandles.push(handle);
  }
  return otherFoodHandles;
  }
  
  function recommendLogic(param){
//   console.log(product_meta);
//   console.log(product_handles);
  
  let allergies = param.q3.split(', ');
  let allowedFood = getAllowedFood(allergies);
  applyAllergies(allergies);
    
  //   メイン提案商品のhandle
  let mainFood;
  //   サブ提案商品の候補の番号のリスト
  let candidateSubFood;
  //   1つ目の条件は当該質問のDかEの個数による条件，2つ目はアレルギーを含んでいない商品のリストallowedFoodにメイン商品が含まれているか
  if ( countDE(param, [4, 5, 6, 7] ) >= 2 && allowedFood.indexOf('stouffato-with-coarse-ground-italian-pate-and-cabbage') >= 0 ){
      mainFood = 'stouffato-with-coarse-ground-italian-pate-and-cabbage';
      candidateSubFood = [23,30,31,32,36,37];
      // console.log('BodyFundation 1');
  }else if( countDE(param, [4] ) >= 1 && allowedFood.indexOf('mackerel-in-miso-sauce') >= 0 ){
      mainFood = 'mackerel-in-miso-sauce';
      candidateSubFood = [19,24];
      // console.log('memory');
  }else if (countDE(param, [5] ) >= 1 && allowedFood.indexOf('meatballs-with-liver-in-tomatoes') >= 0 ){
      mainFood = 'meatballs-with-liver-in-tomatoes';
      candidateSubFood = [1,6,27];
      // console.log('iron');
  }else if (countDE(param, [8] ) >= 1 && allowedFood.indexOf('baby-scallops-and-clams-chowder') >= 0 ){
      mainFood = 'baby-scallops-and-clams-chowder';
      candidateSubFood = [6,24];
      // console.log('bone');
  }else if (countDE(param, [9, 18] ) >= 2 && allowedFood.indexOf('boneless-cod-and-vegetables-with-chinese-sauce') >= 0 ){
      mainFood = 'boneless-cod-and-vegetables-with-chinese-sauce';
      candidateSubFood = [16,23,27,30,38,39];
      // console.log('immunity');
  }else if (countDE(param, [7] ) >= 1 && allowedFood.indexOf('tofu-hamburger-steak-with-edamame-and-hijiki') >= 0 ){
      mainFood = 'tofu-hamburger-steak-with-edamame-and-hijiki';
      candidateSubFood = [1,25,28,34];
      // console.log('concentration');
  }else if (countDE(param, [9, 10, 12] ) >= 2 && allowedFood.indexOf('not-spicy-keema-curry-with-lots-of-hidden-vegetables') >= 0 ){
      mainFood = 'not-spicy-keema-curry-with-lots-of-hidden-vegetables';
      candidateSubFood = [21,26,27,29,37,39];
      // console.log('PhysicalCondition');
  }else if (countDE(param, [16] ) >= 1 && allowedFood.indexOf('grilled-salmon-chan-chan-yaki') >= 0 ){
      mainFood = 'grilled-salmon-chan-chan-yaki';
      candidateSubFood = [7,12,15,20,22,29];
      // console.log('fatigue');
  }else if (countDE(param, [18] ) >= 1 && allowedFood.indexOf('moist-boiled-dadacha-beans-and-unohana') >= 0 ){
      mainFood = 'moist-boiled-dadacha-beans-and-unohana';
      candidateSubFood = [5,12,17,26,28,36];
      // console.log('intestines');
  }else if (countDE(param, [9] ) >= 1 && allowedFood.indexOf('caponata-with-white-beans-and-grilled-eggplant') >= 0 ){
      mainFood = 'caponata-with-white-beans-and-grilled-eggplant';
      candidateSubFood = [2,3];
      // console.log('skin');
  }else if (countDE(param, [19] ) >= 1 && allowedFood.indexOf('sprinkle-with-gold-sesame-seeds-of-autumn-salmon') >= 0 ){
      mainFood = 'sprinkle-with-gold-sesame-seeds-of-autumn-salmon';
      candidateSubFood = [12,15];
      // console.log('stress');
  }else if (countDE(param, [20] ) >= 1 && allowedFood.indexOf('beef-and-chickpea-hashed-beef') >= 0 ){
      mainFood = 'beef-and-chickpea-hashed-beef';
      candidateSubFood = [25,26,35];
      // console.log('Chewing Power');
  }else if (countDE(param, [13] ) >= 1 && allowedFood.indexOf('non-spicy-butter-masala-curry-with-chicken-balls') >= 0 ){
      mainFood = 'non-spicy-butter-masala-curry-with-chicken-balls';
      candidateSubFood = [7,22,34,35];
      // console.log('Preventing thinning');
  }else if (countDE(param, [11] ) >= 1 && allowedFood.indexOf('6-fruit-assortment-set') >= 0 ){
      mainFood = '6-fruit-assortment-set';
      candidateSubFood = [2,16,23];
      // console.log('Cold prevention');
  }else{
      if( allowedFood.indexOf('porcini-and-young-chicken-fricassee') >= 0 ){
        mainFood = 'porcini-and-young-chicken-fricassee';
      }
      candidateSubFood = [6,23,30,31,32,36];
    //   console.log('BodyFundation');
  }
  
  let subFoodHandles = getSubFoodHandles(candidateSubFood, allowedFood);
  let otherFoodHandles = getOtherFoodHandles(allowedFood, mainFood, subFoodHandles);
    // console.log(otherFoodHandles);
    // console.log(allowedFood);
    // console.log('main handle\n' + mainFood);
    // console.log('sub handles\n'+subFoodHandles);
    addClassName(mainFood, subFoodHandles);
  }
  
function checkParam(obj){
for(let i = 1; i <= 20; i++){
  let key = 'q'+i;
  if( ! obj[key] ){
    return false;
  }
}
if( ! obj['q22'] ){
    return false;
  }
return true;
//   return !Object.keys(obj).length;
}

// 残り個数を監視．変更されれば表示を更新． 
$('.bold-ro__choice-progress-value').on('DOMSubtreeModified propertychange', function() {
  showRemaining();
});

function formatJapaneseDate(date){
  let dateList =  date.replace(/,/g, '').split(' ');
  let dateJP = dateList[2] +'年';
  let months = ["January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"];
  dateJP += (months.indexOf(dateList[0])+1) +'月';
  dateJP += dateList[1] +'日';
  return dateJP
}

// $('.next-order-date__container').on('DOMSubtreeModified propertychange', function() {
//   console.log('changed date');
// });

function getOrderDate(){
//   setTimeout(() => {
          let elements = document.getElementsByClassName('next-order-date__container');
          for (let i = 0; i < elements.length; i++){
//            let orderDate = "";
            for(elem of elements[i].childNodes){
                if(elem.nodeName == "#text"){
                    let orderDate = elem.nodeValue;
                    if (orderDate.indexOf('年') < 0 ){
                      elem.nodeValue =  formatJapaneseDate(orderDate);
                    }
                }
            }
//             if (orderDate.indexOf('年') < 0 ){
// //               elements[i].innerHTML = elements[i].innerHTML.replace(orderDate, formatJapaneseDate(orderDate))
//             }
          }
  
          elements = document.getElementsByClassName('ro-translation ro-translation-upcoming_order_date');
          for (let i = 0; i < elements.length; i++){
            let orderDate = elements[i].parentNode.nextElementSibling.textContent;
            if (orderDate.indexOf('年') < 0 ){
              elements[i].parentNode.nextElementSibling.textContent = formatJapaneseDate(orderDate);
            }
          }
  
//         }
//           ,3500
//         )
}

const MAX_RETRY_COUNT_FIND_DIFF_CONTAINER = 10;
var retry_counter = 0;

function createSetInterval(){
  set_interval_id = setInterval(getDiffContainerElements, 1000);
}

function getDiffContainerElements() {
  retry_counter++;
  // 要素がMAXリトライ値になっても見つからない場合、処理を停止する
  if(retry_counter > MAX_RETRY_COUNT_FIND_DIFF_CONTAINER) {
      clearInterval(set_interval_id);
      delete set_interval_id;
  }
  var diff_container_elements = document.getElementsByClassName('next-order-date__container');
  if(diff_container_elements.length > 0) {
      if(typeof(set_interval_id) != 'undefined') { // setIntervalをセットしている状態(初回起動)
          clearInterval(set_interval_id);
          delete set_interval_id; //ここで変数削除しないと単体でこの関数が呼べなくなる
            getOrderDate();
            popupImage();
      }else { // インターバル以外で関数を呼ぶとき(単純にdiff-container要素を取得したい場合に使用) 
        return diff_container_elements;
      }
  }
}

function popupImage() {
  $('.subscription-container').append('<div class="subscription-popup" id="js-popup"><div class="subscription-popup-inner"><div class="subscription-close-btn" id="js-close-btn"><i class="fas fa-times"></i></div><i class="fas fa-exclamation-triangle"></i> 一部の条件で日付を変更すると、選択商品が変更になる場合があります。必ず最後に「今後の商品を変更する」より直近ご注文分の商品をご確認ください。</div><div class="subscription-black-background" id="js-black-bg"></div></div>');
  
  var popup = document.getElementById('js-popup');
  if(!popup) return;
  function closePopUp(elem) {

    if(!elem) return;
    elem.onclick = function() {
      popup.classList.toggle();
    }
//     elem.addEventListener('click', function() {
//       console.log('click');
//       popup.classList.toggle();
//     },false);
  }


  var blackBg = document.getElementById('js-black-bg');
  var closeBtn = document.getElementById('js-close-btn');
  var showBtn = document.getElementsByClassName('msp__btn--primary')[0];
  closePopUp(blackBg);
  closePopUp(closeBtn);
  closePopUp(showBtn);
    //onclickが動かないので、ここでもやる
      $('body').on('click', '#js-black-bg' , function() {
        console.log('click');
        $(".subscription-popup").removeClass("is-show");
    });
      $('body').on('click', '#js-close-btn' , function() {
        console.log('click');
        $(".subscription-popup").removeClass("is-show");
    });

  
//   $('.subscription-popup').remove();
}

// 変更を保存 ボタン
$(document).on("click", ".subscription-button.msp__btn.msp__btn--primary", function(){
//   popupImage();
  $('.subscription-popup').addClass('is-show');
  setTimeout(() => {
    getOrderDate();
  }
  ,3000
  );
});

  $(function() {
    
    console.log('test');
    
    function getCookie(){
      let param = {};
      let keys = ["q1", "q2", "q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15","q16","q17","q18","q19","q20","q22", "isSelected"];
      let cookiesArray = document.cookie.split('; ');
      for(var c of cookiesArray){ 
        var cArray = c.split('='); 
        if( keys.indexOf( cArray[0] ) >= 0 ){
            param[cArray[0]] = decodeURIComponent(cArray[1]);
        }
      }
      return param;
    }
    
    function reloadSubscriptionPage(){
      console.log('interval');
//       console.log(location.pathname);
      let cookies = getCookie();
      console.log(cookies, cookies.isSelected);
      if ( cookies.isSelected == 'true' && location.pathname.match(/tools\/checkout\/api\/manage\/subscription\/app/)) {
        document.cookie = 'isSelected=false; path=/;';
        location.reload();
      }
    }
    
	$(document).ready( function(){

      let path = location.pathname ;
      if( path.match(/tools\/checkout\/manage_subscription_box\/select_products/) ){
        $('.p-page__title').append('<p style="font-weight: bold;">※診断で入力したアレルゲンが含まれる商品は選択できなくなっています。</p>');
        showRemaining()
        // console.log(customer_meta);   
        addTags();
        if (checkParam(customer_meta)){
          console.log('customer_meta');
          recommendLogic(customer_meta);
        }
        else{
          let cookies = getCookie();
          console.log('use cookie');
          recommendLogic(cookies);
        }

        changeFigSize();
        
        document.cookie = 'isSelected=true; path=/;';
//         set_interval_id_reload = setInterval(reloadSubscriptionPage, 1000);
        
        }
        else if ( path.match(/tools\/checkout\/api\/manage\/subscription\/app/) ){
  //         console.log('subscription');
          createSetInterval();
        }
      });
});


$(document).ready(function(){
    var elementBoldProductDetails = document.getElementsByClassName('bold-product__details');
    for(let i = 0; i < elementBoldProductDetails.length; i++){
      elementBoldProductDetails[i].style = null;
    }
});
