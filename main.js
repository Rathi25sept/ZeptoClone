import './style.css'
import { myAllData } from './counter.js'
import { subCategories } from './counter.js'

function myAllItems(mainList){
  var cardContainer = document.querySelector('#mainContainer');
  cardContainer.innerHTML = '';
  mainList.forEach(function(item){
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.id = item.id;
    img.addEventListener('click',createDetailPage);
    img.src = item.img;
    img.width = 150;
    img.height = 150;
    var h3 = document.createElement('h3');
    h3.innerText = item.name;
    var addDiv = document.createElement('div');
    addDiv.className = 'addDiv';
    var p = document.createElement('p');
    p.innerText = 'Rs.' + item.price;
    var addBtn = document.createElement('button');
    addBtn.innerText = 'Add';
    addBtn.id = item.id;
    var plusDiv = document.createElement('div');
    plusDiv.className = 'plusDiv';
    var subtract = document.createElement('span');
    subtract.innerText = '-';
    var plus = document.createElement('span');
    plus.innerText = '+';
    plus.id = item.id;
    subtract.id = item.id;
    subtract.addEventListener('click',subtractToCart);
    plus.addEventListener('click', addToCart);
    addBtn.addEventListener('click', addToCart);
    plusDiv.append(subtract,addBtn,plus);
    addDiv.append(p,plusDiv);
    div.append(img,h3,addDiv);
    cardContainer.append(div);
    div.className = 'card';
    
  })
}
myAllItems(myAllData);


function btnFunction(event){
  var inputElement = document.getElementById('searchText');
  inputElement.value = '';
  console.log('hello-----',inputElement.value);
  console.log('event----',event.target.innerText, event);
  var filterData = dataByCatecories(event.target.innerText);
  myAllItems(filterData);
   console.log("hello i am button",filterData);

 }

function createSidebar(){
  var ul = document.createElement('ul');

  subCategories.forEach(function(categorie){
    var li = document.createElement('li');
    var img = document.createElement('img')
    var div = document.createElement('div');
    div.className = 'ulList';
    img.src = categorie.icon;

    var btn = document.createElement('button');
    btn.className = "btn";
    btn.innerText = categorie.type; 

    btn.addEventListener('click',btnFunction);
    li.append(btn);
    div.append(img,li);
    ul.append(div);
    
  })
  var newSideBar = document.querySelector('#sideBar');
  console.log(newSideBar);
  newSideBar.append(ul);

  console.log(ul);
};
createSidebar();


function dataByCatecories(itemCategorie){
  var newArr = [];
  myAllData.forEach(function(item){
    if(item.categories.includes(itemCategorie)){
      newArr.push(item);
    }
  })
  return newArr;
}



function getSearchedName(inputText){
  var arr = [];
  myAllData.forEach(function(item){
    if(item.name.toLocaleLowerCase().includes(inputText.toLocaleLowerCase().trim())){
      arr.push(item);
    }
    else if(item.categories[0].toLocaleLowerCase() == (inputText.toLocaleLowerCase().trim())){
      arr.push(item);
    }

  });
  console.log(arr);
  return arr;
}
function searchText(event){
  console.log(event.key, event.type);
  if(event.key == 'Enter' || event.type == 'click'){

    var inputElement = document.getElementById('searchText');
    console.log('hello-----',inputElement.value);
    var filterValue = getSearchedName(inputElement.value);
    myAllItems(filterValue);
  }
}

function createHeader(){
  var newHeader = document.querySelector('#navbar');
  var srchContainer = document.createElement('div');
  srchContainer.className = 'srchBtn'
  var searchBtn = document.createElement('button');
  searchBtn.innerText = "Search";
  searchBtn.id = 'searchBtn'
  searchBtn.addEventListener('click', searchText);
  var int = document.createElement('input');
  int.type = "text";
  int.placeholder = 'Search the Products';
  int.id = 'searchText';
  int.addEventListener('keydown',searchText);
  var loginBox = document.createElement('div');
  loginBox.innerText = 'Login';
  loginBox.className = 'loginBox'
  loginBox.addEventListener('click',createLoginBtn);
  var itemBox = document.createElement('div');
  itemBox.className = 'itemBox';
  itemBox.innerText = 'My Cart';
  itemBox.addEventListener('click',createMyCartModal);
  itemBox.id = 'cartCount';
  console.log(newHeader);
   var logoContainer = createLogo();
  srchContainer.append(int ,searchBtn);
  newHeader.append(logoContainer,srchContainer,loginBox,itemBox);
  };
  createHeader();
  function createLogo(){
    var logoContainer = document.createElement('div');
    logoContainer.className = 'zetpoText'
    var logo = document.createElement('span');
    logo.innerText = 'Zepto';
    var divider = document.createElement('span');
    divider.innerText = '|';
    divider.className = 'zeptoSpn';
    logoContainer.append(logo,divider);
    return logoContainer;
  }

  function createMyCartModal(){
    var myCartDiv = document.createElement('div');
    myCartDiv.className = 'cartDiv';
    var cartLists = createCartList(cartList);
    myCartDiv.append(cartLists);
    createModal(myCartDiv);

  }
  
  function createCartList(cartList){
    var table = document.createElement('table');
    cartList.forEach(function(product){
      console.log(product);
      var tableRow = document.createElement('tr');
      var tableData1 = document.createElement('td')
      tableData1.innerText ='Name : '+ product.name;
      var tableData2 = document.createElement('td');
      tableData2.innerText ='quantity : '+ product.quantity;
      var tableData3 = document.createElement('td');
      tableData3.innerText = 'price : '+ product.price;
      tableRow.append(tableData1,tableData2,tableData3);
      table.append(tableRow);
    })
    console.log('table---',table);
    return table;

  }

  function createModal(modal){
    var outerBox = document.createElement('div');
    outerBox.id = 'outerBox';
    outerBox.addEventListener('click',closeModal);
    outerBox.append(modal)
    document.body.append(outerBox);
  }

  function createLoginBtn(){
    var loginContainer = document.createElement('div');
    loginContainer.id = 'loginBox';
    var loginHeading = document.createElement('h1');
    loginHeading.innerText = 'Zepto';
    var loginPara = document.createElement('p');
    loginPara.innerText = 'Groceries delivered in 10 Minutes';
    var loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.placeholder = 'Enter Phone Number';
    var loginbtn = document.createElement('button');
    loginbtn.innerText = 'Continue';
    var closeBtn = document.createElement('button');
    closeBtn.innerText = 'X';
    closeBtn.id = 'loginCloseBtn';
    loginContainer.append(closeBtn,loginHeading,loginPara,loginInput,loginbtn);
    createModal(loginContainer);
  }

  function closeModal(){
    console.log('modal close');
    document.body.removeChild(document.getElementById('outerBox'));
  }

  function addToCart(event){
    var id = event.target.id;
    console.log('addtoCart even id--',event,id);
    var isProductExist = isItemInCartList(cartList,id);
    if(isProductExist){
      var product = getproductFromId(cartList,id); 
      product.quantity = product.quantity + 1;
      console.log('product--',product);

    }
    else{
      var product = getproductFromId(allItems,id); 
      product.quantity = 1;
      console.log('product--',product);
      cartList.push(product);
    }
    document.getElementById('cartCount').innerText = cartList.length + ' items Rs. ' + getTotalPrice(cartList);
    console.log('cartttt----',product,cartList);

  }
  function isItemInCartList(products,id){
    console.log('item------',products);
    for(var i=0; i<products.length; i++){
      if(products[i].id == id){
        return true;
      }
    }
    return false;

  }
  function getTotalPrice(items){
    var totalPrice = 0;
    items.forEach(function(item){
      totalPrice += item.price * item.quantity;
    })
    return totalPrice;
  }

  
  function createDetailPage(event){
    console.log(event.target.id,getproductFromId(allItems,event.target.id));
    var product = getproductFromId(allItems,event.target.id); 
    var container = document.createElement('div');
    container.id = 'box';
    var detail = document.createElement('div');
    detail.className = 'box-1';
    var img = document.createElement('img')
    img.src = product.img;
    var details = document.createElement('div');
    details.className = 'box-2';
    var heading = document.createElement('h2');
    heading.innerText = product.name;
    var price = document.createElement('p');
    price.innerText = 'Rs.' +product.price;
    var countryOfOrigin = document.createElement('p');
    countryOfOrigin.innerText = 'Country Of Origin : ' + product.countryOfOrigin;
    var add = document.createElement('div');
    add.innerText = 'Add';
    add.id = product.id;
    add.addEventListener('click',addToCart)
    var closeBtn = document.createElement('button');
    closeBtn.innerText = 'X';
    closeBtn.addEventListener('click',closeModal);
    
  
    details.append(closeBtn,heading,price,countryOfOrigin,add)
    detail.append(img);
    container.append(detail,details);
    createModal(container);
  }
function getproductFromId(products,id){
  for(var i=0; i<products.length; i++){
    if(products[i].id == id){
      console.log('return true--')
      return products[i];
    }
  }
}; 


function subtractToCart(event){
  var id = event.target.id;
  console.log('addtoCart even id--',event,id);
  var isProductExist = isItemInCartList(cartList,id);
  if(isProductExist){
    var product = getproductFromId(cartList,id); 
    product.quantity = product.quantity - 1;
    console.log('product--',product);
    cartList.removeChild(product);

  }
  else{
    var product = getproductFromId(allItems,id); 
    product.quantity = 0;
    console.log('product--',product);
    cartList.push(product);
  }
  document.getElementById('cartCount').innerText = cartList.length + ' items Rs. ' + getTotalPrice(cartList);
  console.log('cartttt----',product,cartList);

}























































// // class Search{
// //   constructor(inputText) {
// //     this.SearchedName(inputText)
// //   }
// SearchedName(inputText) {
//   let arr = [];
//   myAllData.forEach(function(item){
//     if(item.name.toLocaleLowerCase().includes(inputText.toLocaleLowerCase().trim())){
//       arr.push(item);
//       // console.log(item);
//     }
//     else if(item.categories[0].toLocaleLowerCase() == (inputText.toLocaleLowerCase().trim())){
//       arr.push(item);
//     }

//   });
//   console.log(arr);
//   return arr;
// }
// // }
// // const searchbox = new Search();
// // console.log(searchbox);

// // class SearchFun{
// //   constructor(){
// //     this.mySearch();
// //   }
// mySearch(event){
//   if(event.key){

//     let inputElement = document.getElementById('searchText');
//     console.log('hello-----',inputElement.value);
//     let filterValue = getSearchedName(inputElement.value);
//   }
// }
// // }
// // const searchbar = new SearchFun();
// // console.log(searchbar);
