
var localObj = {
  items: undefined,
  itemsCount: 0,
  slug: 'test',
  init: function(_slug){
    if(_slug && _slug != ''){
      this.slug = _slug;
    }
  },
  hasLocalStorage: function(){
    if (typeof localStorage !== 'undefined') {
      try {
        var testObj = { 'one': 1, 'two': 2, 'three': 3 };
        localStorage.setItem('future_proof', JSON.stringify(testObj));
        if( localStorage.getItem('future_proof') === JSON.stringify(testObj) ) {
          localStorage.removeItem('future_proof');
          return true;
        } else {
          return false;
        }
      } catch(e) {
        // o noz!
        return false;
      }
    } else {
      return false;
    }
  },
  getItemsCount: function(){
    if(this.hasLocalStorage()){
      this.itemsCount = localStorage.getItem(this.slug+'_items_count');
      if(this.itemsCount == undefined){
        localStorage.setItem(this.slug+'_items_count', 0);
        return 0;
      }else{
        return parseInt(localStorage.getItem(this.slug+'_items_count'));
      }
    }
    return this.itemsCount;
  },
  setItemsCount: function(count){
    this.itemsCount = this.getItemsCount() + count;
    if(this.itemsCount < 0){this.itemsCount = 0;}
    if(this.hasLocalStorage()){
      if(count == 0){
        localStorage.setItem(this.slug+'_items_count', 0);
        return 0;
      }else{
        localStorage.setItem(this.slug+'_items_count', this.itemsCount);
      }
    }
    return this.itemsCount;
  },
  addItem: function(item){
    var idx = this.setItemsCount(1) - 1;
    item['idx'] = idx;
    if(this.items == undefined){
      this.items = [];
    }
    this.items.push(item);
    if(this.hasLocalStorage()){
      localStorage.setItem(this.slug+'_items', JSON.stringify(this.items));
    }
  },
  getItems: function(){
    if(this.hasLocalStorage()){
      this.items = JSON.parse(localStorage.getItem(this.slug+'_items'));
    }

    return this.items;
  },
  removeItem: function(idx){
    if(this.items != undefined){
      this.items = _.reject(this.items, {idx: idx});
    }

    if(this.hasLocalStorage()){
      localStorage.setItem(this.slug+'_items', JSON.stringify(this.items));
    }
    setItemsCount(-1);

  },
  emptyItems: function(){
    localStorage.clear();
    this.items = [];
    this.itemCount = 0;
  }

}

